#!/usr/bin/env python3
"""求道量子前台探测：HTTP、空主栏、占位符、静态资源、API 一致性。

用法:
  python tools/probe_site.py
  python tools/probe_site.py --base http://127.0.0.1:18085 --json
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field, asdict
from html.parser import HTMLParser
from typing import Any

JS_HYDRATED = {
    "post": True,
    "tag": True,
    "column": True,
    "columns": True,  # 书架由 volume.js 追加 .vol-shelf
    "news": True,
}

PLACEHOLDER_RE = re.compile(r"/\{[a-zA-Z_][a-zA-Z0-9_]*\}")
MAIN_RE = re.compile(r"<main\b([^>]*)>(.*?)</main>", re.I | re.S)
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.I | re.S)
SCRIPT_SRC_RE = re.compile(r'<script[^>]+src=["\']([^"\']+)["\']', re.I)
LINK_HREF_RE = re.compile(r'<link[^>]+href=["\']([^"\']+)["\']', re.I)
IMG_SRC_RE = re.compile(r'<img[^>]+src=["\']([^"\']+)["\']', re.I)
A_HREF_RE = re.compile(r'<a[^>]+href=["\']([^"\']+)["\']', re.I)


@dataclass
class Finding:
    severity: str  # error | warn | info
    path: str
    code: str
    message: str


@dataclass
class ProbeResult:
    ok: bool
    findings: list[Finding] = field(default_factory=list)
    pages: list[dict[str, Any]] = field(default_factory=list)


class HrefCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.hrefs: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        for k, v in attrs:
            if k == "href" and v:
                self.hrefs.append(v)


def fetch(
    base: str,
    path: str,
    *,
    method: str = "GET",
    data: bytes | None = None,
    headers: dict[str, str] | None = None,
    timeout: float = 8.0,
) -> tuple[int, dict[str, str], bytes]:
    url = path if path.startswith("http") else urllib.parse.urljoin(base.rstrip("/") + "/", path.lstrip("/"))
    if path.startswith("/") and not path.startswith("http"):
        url = base.rstrip("/") + path
    req = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read()
            hdrs = {k.lower(): v for k, v in resp.headers.items()}
            return resp.status, hdrs, body
    except urllib.error.HTTPError as e:
        body = e.read() if e.fp else b""
        hdrs = {k.lower(): v for k, v in (e.headers.items() if e.headers else [])}
        return e.code, hdrs, body
    except urllib.error.URLError as e:
        raise SystemExit(f"无法连接 {url}: {e}") from e


def decode_html(body: bytes, headers: dict[str, str]) -> str:
    ct = headers.get("content-type", "")
    m = re.search(r"charset=([\w-]+)", ct, re.I)
    enc = (m.group(1) if m else "utf-8").strip()
    return body.decode(enc, errors="replace")


def main_inner(html: str) -> tuple[str, str]:
    m = MAIN_RE.search(html)
    if not m:
        return "", ""
    return m.group(1), m.group(2)


def visible_text(html_frag: str) -> str:
    t = re.sub(r"<script\b[^>]*>.*?</script>", "", html_frag, flags=re.I | re.S)
    t = re.sub(r"<style\b[^>]*>.*?</style>", "", t, flags=re.I | re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def api_rows(base: str, path: str) -> list[dict[str, Any]]:
    code, hdrs, body = fetch(base, path, headers={"Accept": "application/json"})
    if code != 200:
        return []
    try:
        payload = json.loads(body.decode("utf-8"))
    except json.JSONDecodeError:
        return []
    if isinstance(payload, dict) and isinstance(payload.get("rows"), list):
        return [r for r in payload["rows"] if isinstance(r, dict)]
    if isinstance(payload, list):
        return [r for r in payload if isinstance(r, dict)]
    return []


def abs_asset(src: str) -> str | None:
    if not src or src.startswith("data:") or src.startswith("mailto:") or src.startswith("javascript:"):
        return None
    if src.startswith("http://") or src.startswith("https://"):
        return src
    if src.startswith("//"):
        return "https:" + src
    return src


def classify_page(path: str) -> str:
    if path == "/" or path == "":
        return "home"
    if path == "/about":
        return "about"
    if path == "/tags":
        return "tags"
    if path == "/columns":
        return "columns"
    if path == "/news":
        return "news"
    if path == "/login":
        return "login"
    if path.startswith("/post/"):
        return "post"
    if path.startswith("/tag/"):
        return "tag"
    if path.startswith("/column/"):
        return "column"
    if path.startswith("/desk"):
        return "desk"
    return "other"


def probe(base: str) -> ProbeResult:
    result = ProbeResult(ok=True)
    findings: list[Finding] = []

    def note(sev: str, path: str, code: str, msg: str) -> None:
        findings.append(Finding(sev, path, code, msg))
        if sev == "error":
            result.ok = False

    # --- APIs ---
    posts = api_rows(base, "/api/posts")
    columns = api_rows(base, "/api/columns")
    news = api_rows(base, "/api/news")
    if not posts:
        note("error", "/api/posts", "api_empty", "文章 API 无数据")
    if not columns:
        note("error", "/api/columns", "api_empty", "专栏 API 无数据")
    if not news:
        note("warn", "/api/news", "api_empty", "新闻 API 无数据")

    post_slugs = [str(p.get("slug") or "") for p in posts if p.get("slug")]
    col_slugs = [str(c.get("slug") or "") for c in columns if c.get("slug")]
    tag_values = sorted({str(p.get("tag") or "").strip() for p in posts if str(p.get("tag") or "").strip()})

    known_tag_slugs = {"quantum", "algorithm", "hardware", "sci-pop", "marqdo"}
    for p in posts:
        slug = str(p.get("slug") or "")
        tag = str(p.get("tag") or "").strip()
        if not slug:
            note("error", "/api/posts", "post_no_slug", f"id={p.get('id')} 缺少 slug")
            continue
        content = str(p.get("content") or "")
        if len(content) < 20:
            note("warn", f"/post/{slug}", "thin_content", f"正文过短 ({len(content)} 字)")
        if tag and tag not in known_tag_slugs:
            note(
                "error",
                f"/post/{slug}",
                "bad_tag",
                f"posts.tag={tag!r} 不是已知标签 slug，标签页与链接会错",
            )
        col = str(p.get("column_slug") or "").strip()
        if col and col not in col_slugs:
            note("error", f"/post/{slug}", "orphan_column", f"column_slug={col!r} 不在专栏表中")

    # --- static ---
    statics = [
        "/static/theme.js",
        "/static/volume.js",
        "/static/md.js",
        "/static/desk-guard.js",
        "/static/katex/katex.min.js",
        "/static/katex/auto-render.min.js",
        "/static/katex/katex.min.css",
        "/static/logo.png",
        "/static/logo-light.png",
        "/static/covers/vol-marqdo.jpg",
        "/static/covers/vol-linear-algebra.jpg",
        "/static/covers/vol-quantum.jpg",
        "/favicon.ico",
        "/icons/favicon.svg",
        "/icons/logo.png",
    ]
    for s in statics:
        code, _, body = fetch(base, s)
        if code != 200 or len(body) < 16:
            note("error", s, "static_missing", f"HTTP {code} size={len(body)}")

    # --- pages ---
    pages: list[str] = [
        "/",
        "/about",
        "/tags",
        "/columns",
        "/news",
        "/login",
        "/desk",
        "/post/this-slug-does-not-exist",
        "/column/this-column-does-not-exist",
        "/tag/this-tag-does-not-exist",
    ]
    pages += [f"/post/{s}" for s in post_slugs]
    pages += [f"/column/{s}" for s in col_slugs]
    pages += [f"/tag/{t}" for t in sorted(known_tag_slugs)]
    # also probe whatever tags actually exist in DB
    pages += [f"/tag/{urllib.parse.quote(t, safe='')}" for t in tag_values if t not in known_tag_slugs]

    seen: set[str] = set()
    ordered: list[str] = []
    for p in pages:
        if p not in seen:
            seen.add(p)
            ordered.append(p)

    required_scripts = ("theme.js", "volume.js", "md.js")
    crawled_hrefs: set[str] = set()

    for path in ordered:
        kind = classify_page(path)
        code, hdrs, body = fetch(base, path)
        html = decode_html(body, hdrs) if body else ""
        loc = hdrs.get("location", "")
        attrs, inner = main_inner(html)
        text = visible_text(inner)
        placeholders = PLACEHOLDER_RE.findall(html)
        scripts = SCRIPT_SRC_RE.findall(html)
        title_m = TITLE_RE.search(html)
        title = re.sub(r"\s+", " ", title_m.group(1)).strip() if title_m else ""

        rec: dict[str, Any] = {
            "path": path,
            "kind": kind,
            "status": code,
            "title": title,
            "main_chars": len(text),
            "redirect": loc,
            "placeholders": placeholders,
        }
        result.pages.append(rec)

        if kind == "desk":
            if code not in (301, 302, 303, 307, 308) and code != 200:
                note("error", path, "desk_status", f"未登录后台期望重定向或登录页，得到 {code}")
            elif code == 200 and "login" not in html.lower() and "/login" not in html:
                # 可能已登录；仅提示
                note("info", path, "desk_200", "未登录探测得到 200，可能本机仍有会话 cookie")
            continue

        if code != 200:
            note("error", path, "http", f"HTTP {code} location={loc}")
            continue

        if placeholders:
            note(
                "error",
                path,
                "placeholder",
                "HTML 含未替换路由占位符: " + ", ".join(sorted(set(placeholders))),
            )

        for name in required_scripts:
            if kind == "login":
                continue
            if not any(name in s for s in scripts):
                note("error", path, "script_missing", f"未挂载 {name}")

        imgs = [abs_asset(x) for x in IMG_SRC_RE.findall(html)]
        for img in imgs:
            if not img or img.startswith("http"):
                continue
            ic, _, ib = fetch(base, img)
            if ic != 200:
                note("error", path, "broken_img", f"{img} -> {ic}")

        for href in A_HREF_RE.findall(html):
            if href.startswith("/") and not href.startswith("//"):
                crawled_hrefs.add(href.split("#")[0])

        # SSR emptiness
        has_article = "class=\"article\"" in inner or "class='article'" in inner
        has_cards = "class=\"card\"" in inner or "content cards" in inner
        has_intro = "main-intro" in inner or "kicker" in inner

        if kind == "home":
            if not has_cards:
                note("error", path, "home_no_cards", "首页主栏没有文章卡片")
            if "column-gate" not in inner:
                note("warn", path, "home_no_gate", "首页缺少专栏门")
        elif kind == "about":
            if "关于" not in html:
                note("error", path, "about_copy", "关于页缺少文案")
        elif kind == "tags":
            if not has_cards and "href=\"/tag/" not in html:
                note("error", path, "tags_empty", "标签归档没有条目")
        elif kind == "login":
            if "<form" not in html.lower():
                note("error", path, "login_form", "登录页没有表单")
        elif kind == "post":
            slug = urllib.parse.unquote(path.rsplit("/", 1)[-1])
            row = next((p for p in posts if str(p.get("slug")) == slug), None)
            if slug == "this-slug-does-not-exist":
                if has_article:
                    note("info", path, "ghost_article", "不存在的 slug 仍 SSR 出了 article")
            elif row is None:
                note("error", path, "post_missing_api", "路径在页面存在但 API 无此 slug")
            else:
                if not has_article:
                    note("error", path, "post_ssr_empty", "详情 SSR 为空（Marqdo≥1.0.1 应已修复）")
                if not str(row.get("content") or "").strip():
                    note("error", path, "post_empty_body", "API 正文为空")
                # Markdown body class preferred
                if has_article and "article-body" not in inner and "article-p" not in inner:
                    note("warn", path, "post_no_body", "有 article 但未见正文容器")
        elif kind == "tag":
            slug = urllib.parse.unquote(path.rsplit("/", 1)[-1])
            matches = [p for p in posts if str(p.get("tag") or "") == slug]
            if slug.startswith("this-tag"):
                pass
            elif not matches and slug in known_tag_slugs:
                note("warn", path, "tag_no_posts", f"标签 {slug} 下没有文章")
        elif kind == "column":
            slug = urllib.parse.unquote(path.rsplit("/", 1)[-1])
            if slug.startswith("this-column"):
                continue
            if slug not in col_slugs:
                note("warn", path, "unknown_column", f"专栏 {slug} 不在 API 中")
            else:
                n = sum(1 for p in posts if str(p.get("column_slug") or "") == slug)
                if n == 0:
                    note("warn", path, "column_empty", f"专栏 {slug} 下没有归属文章")
        elif kind == "columns":
            if "lede" in inner and "装载" in inner and not has_cards:
                note("info", path, "shelf_js", "书架主栏依赖 volume.js 注入")
        elif kind == "news":
            if "装载" in inner:
                note("info", path, "news_js", "新闻归档依赖 volume.js 注入")

        if kind in ("home", "about", "tags") and len(text) < 8 and not has_intro:
            note("error", path, "empty_main", "主栏几乎为空且无引言")

    # follow a sample of internal links from home
    code, hdrs, home_body = fetch(base, "/")
    home_html = decode_html(home_body, hdrs)
    for href in A_HREF_RE.findall(home_html):
        if not href.startswith("/") or href.startswith("//"):
            continue
        p = href.split("?")[0].split("#")[0]
        if p in seen or p.startswith("/static") or p.startswith("/_"):
            continue
        if p.startswith("/desk") or p.startswith("/admin"):
            continue
        hc, _, _ = fetch(base, p)
        if hc >= 400:
            note("error", "/", "home_link", f"首页链接 {p} -> {hc}")

    result.findings = findings
    return result


def main() -> int:
    ap = argparse.ArgumentParser(description="求道量子页面探测")
    ap.add_argument("--base", default="http://127.0.0.1:18085")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

    fetch(args.base, "/")  # connectivity
    result = probe(args.base)

    if args.json:
        print(
            json.dumps(
                {
                    "ok": result.ok,
                    "findings": [asdict(f) for f in result.findings],
                    "pages": result.pages,
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        return 0 if result.ok else 1

    counts = {"error": 0, "warn": 0, "info": 0}
    print(f"探测 {args.base}  ·  页面 {len(result.pages)} 张")
    print("-" * 60)
    for f in result.findings:
        counts[f.severity] = counts.get(f.severity, 0) + 1
        mark = {"error": "ERR ", "warn": "WARN", "info": "INFO"}[f.severity]
        print(f"{mark}  [{f.code}] {f.path}\n      {f.message}")
    print("-" * 60)
    print(f"error={counts['error']}  warn={counts['warn']}  info={counts['info']}")
    if result.ok:
        print("结果: 无 error（warn/info 见上）")
        return 0
    print("结果: 存在 error，需修复")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
