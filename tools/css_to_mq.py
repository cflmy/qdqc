#!/usr/bin/env python3
"""Convert public/*.css → styles/*.mq.md style tables (Marqdo 0.3.2+).

- Values containing `/` are quoted (`"1 / 5"`) so table cells are not divided.
- `@media` uses the 媒体 column.
- `@keyframes` uses `|@keyframes name|stop|prop: val|` rows.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def strip_comments(css: str) -> str:
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def split_top_level(css: str) -> list[tuple[str, str, str]]:
    """Return list of (kind, header, body) where kind in rule|media|keyframes|raw."""
    css = strip_comments(css)
    i, n = 0, len(css)
    out: list[tuple[str, str, str]] = []
    while i < n:
        while i < n and css[i].isspace():
            i += 1
        if i >= n:
            break
        start = i
        if css.startswith("@", i):
            while i < n and css[i] not in "{;":
                i += 1
            header = css[start:i].strip()
            if i < n and css[i] == ";":
                i += 1
                out.append(("raw", header, ""))
                continue
            if i >= n or css[i] != "{":
                break
            depth = 0
            body_start = i + 1
            while i < n:
                if css[i] == "{":
                    depth += 1
                elif css[i] == "}":
                    depth -= 1
                    if depth == 0:
                        body = css[body_start:i]
                        i += 1
                        low = header.lower()
                        if low.startswith("@keyframes"):
                            out.append(("keyframes", header, body))
                        elif low.startswith("@media"):
                            out.append(("media", header, body))
                        else:
                            out.append(("raw", header, body))
                        break
                i += 1
            else:
                break
            continue
        # normal rule: selector { ... }
        while i < n and css[i] != "{":
            i += 1
        if i >= n:
            break
        sel = css[start:i].strip()
        depth = 0
        body_start = i + 1
        while i < n:
            if css[i] == "{":
                depth += 1
            elif css[i] == "}":
                depth -= 1
                if depth == 0:
                    out.append(("rule", sel, css[body_start:i]))
                    i += 1
                    break
            i += 1
        else:
            break
    return out


def parse_decls(body: str) -> list[tuple[str, str]]:
    decls: list[tuple[str, str]] = []
    i, n = 0, len(body)
    while i < n:
        while i < n and body[i].isspace():
            i += 1
        if i >= n:
            break
        # skip nested blocks (shouldn't appear in simple decls)
        if body[i] == "{":
            depth = 0
            while i < n:
                if body[i] == "{":
                    depth += 1
                elif body[i] == "}":
                    depth -= 1
                    if depth == 0:
                        i += 1
                        break
                i += 1
            continue
        start = i
        while i < n and body[i] != ":" and body[i] != "{":
            i += 1
        if i >= n or body[i] != ":":
            break
        prop = body[start:i].strip()
        i += 1
        val_start = i
        depth = 0
        while i < n:
            c = body[i]
            if c in "([":
                depth += 1
            elif c in ")]":
                depth = max(0, depth - 1)
            elif c == ";" and depth == 0:
                break
            elif c == "}" and depth == 0:
                break
            i += 1
        val = body[val_start:i].strip().rstrip(";")
        if prop:
            decls.append((prop, val))
        if i < n and body[i] == ";":
            i += 1
    return decls


def parse_keyframe_stops(body: str) -> list[tuple[str, list[tuple[str, str]]]]:
    stops: list[tuple[str, list[tuple[str, str]]]] = []
    for kind, header, inner in split_top_level(body):
        if kind != "rule":
            continue
        stop = header.strip()
        stops.append((stop, parse_decls(inner)))
    return stops


def cell_escape(s: str) -> str:
    return s.replace("\n", " ").replace("|", "\\|").strip()


def format_value(val: str) -> str:
    # Collapse CSS source newlines so GFM table rows stay single-line.
    v = re.sub(r"\s+", " ", val.strip())
    if v == "":
        return '""'
    # Single CSS string literal "" or "…" with no inner quotes
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'" and v.count(v[0]) == 2:
        inner = v[1:-1].replace("\\", "\\\\").replace('"', '\\"')
        return f'"{inner}"'
    # Slash, quotes, or pipes → Marqdo quoted text (keep CSS quotes inside)
    if "/" in v or '"' in v or "'" in v or "|" in v:
        esc = v.replace("\\", "\\\\").replace('"', '\\"')
        return f'"{esc}"'
    return cell_escape(v)


def format_sel(sel: str) -> str:
    return cell_escape(re.sub(r"\s+", " ", sel))


def media_query(header: str) -> str:
    # "@media (max-width: 900px)" → "(max-width: 900px)"
    m = re.match(r"@media\s+(.+)$", header.strip(), re.I)
    return m.group(1).strip() if m else header.strip()


def keyframes_name(header: str) -> str:
    m = re.match(r"@keyframes\s+([^\s{]+)", header.strip(), re.I)
    return m.group(1) if m else "anim"


def rows_from_css(css: str) -> tuple[list[tuple[str, str, str]], list[tuple[str, str, str, str]], list[tuple[str, str, str]]]:
    """base rows (sel,prop,val), media rows (media,sel,prop,val), keyframe rows (sel,stop,val_as_decl)."""
    base: list[tuple[str, str, str]] = []
    media: list[tuple[str, str, str, str]] = []
    anim: list[tuple[str, str, str]] = []

    for kind, header, body in split_top_level(css):
        if kind == "rule":
            for p, v in parse_decls(body):
                base.append((header, p, v))
        elif kind == "media":
            mq = media_query(header)
            for sk, sh, sb in split_top_level(body):
                if sk != "rule":
                    continue
                for p, v in parse_decls(sb):
                    media.append((mq, sh, p, v))
        elif kind == "keyframes":
            name = keyframes_name(header)
            for stop, decls in parse_keyframe_stops(body):
                if not decls:
                    continue
                # One row per stop; value = joined declarations (supports multi-prop)
                joined = "; ".join(f"{p}: {v}" for p, v in decls)
                anim.append((f"@keyframes {name}", stop, joined))
        # raw at-rules skipped (none expected)
    return base, media, anim


def emit_table_3(rows: list[tuple[str, str, str]]) -> str:
    lines = [
        "| 选择器 | 属性 | 值 |",
        "|--------|------|-----|",
    ]
    for sel, prop, val in rows:
        lines.append(f"| {format_sel(sel)} | {cell_escape(prop)} | {format_value(val)} |")
    return "\n".join(lines)


def emit_table_media(rows: list[tuple[str, str, str, str]]) -> str:
    lines = [
        "| 媒体 | 选择器 | 属性 | 值 |",
        "|------|--------|------|-----|",
    ]
    for mq, sel, prop, val in rows:
        lines.append(
            f"| {cell_escape(mq)} | {format_sel(sel)} | {cell_escape(prop)} | {format_value(val)} |"
        )
    return "\n".join(lines)


def emit_table_keyframes(rows: list[tuple[str, str, str]]) -> str:
    # 属性 = stop; 值 = "opacity: 0; transform: ..."
    lines = [
        "| 选择器 | 属性 | 值 |",
        "|--------|------|-----|",
    ]
    for sel, stop, val in rows:
        # Value contains `:`; must be quoted if also has `/`, else OK as bare
        # Always quote multi-decl values that contain `;` to keep as one text cell?
        # Bare `opacity: 0` works as text (no division). Multi with spaces fine.
        # Quote if `/` present.
        lines.append(f"| {format_sel(sel)} | {cell_escape(stop)} | {format_value(val)} |")
    return "\n".join(lines)


def build_module(title: str, description: str, css: str) -> str:
    base, media, anim = rows_from_css(css)
    parts: list[str] = [
        "---",
        f"title: styles/{title}",
        f"description: {description}",
        "import 网页:ext/web/网页.mq.md",
        "import text:lib/text.mq.md",
        "---",
        "",
        f"由 public/{title}.css 迁入的样式表。含 `/` 的值已加引号（Marqdo 0.3.2+）。",
        "禁止在本文件顶层使用无序列表符号。",
        "",
    ]
    sections: list[str] = []

    if base:
        parts.append("## 规则")
        parts.append("")
        parts.append("`规则` =")
        parts.append("")
        parts.append(emit_table_3(base))
        parts.append("")
        parts.append("**`规则`**")
        parts.append("")
        sections.append("规则")

    if anim:
        parts.append("## 动画")
        parts.append("")
        parts.append("`动画` =")
        parts.append("")
        parts.append(emit_table_keyframes(anim))
        parts.append("")
        parts.append("**`动画`**")
        parts.append("")
        sections.append("动画")

    if media:
        parts.append("## 响应式")
        parts.append("")
        parts.append("`响应式` =")
        parts.append("")
        parts.append(emit_table_media(media))
        parts.append("")
        parts.append("**`响应式`**")
        parts.append("")
        sections.append("响应式")

    parts.append("## 全局")
    parts.append("")
    for s in sections:
        parts.append(f"*表{s} = > {s}*")
    parts.append("")
    for s in sections:
        parts.append(f'*css{s} = > 网页.样式装配 名="{s}" 表=`表{s}`*')
    parts.append("")
    parts.append("`css段` =")
    parts.append("")
    parts.append("| css |")
    parts.append("|-----|")
    for s in sections:
        parts.append(f"| `css{s}` |")
    parts.append("")
    parts.append('*css = > text.str_join xs=`css段` sep=""*')
    parts.append("**css**")
    parts.append("")
    return "\n".join(parts)


def main() -> None:
    jobs = [
        ("volume", "专栏书架、刊头导读与量子新闻侧栏样式。"),
        ("editor", "写作台编辑器样式。"),
        ("brand-motion", "刊头与入场动效样式。"),
    ]
    out_dir = ROOT / "styles"
    out_dir.mkdir(exist_ok=True)
    for name, desc in jobs:
        src = ROOT / "public" / f"{name}.css"
        css = src.read_text(encoding="utf-8")
        mq = build_module(name, desc, css)
        dest = out_dir / f"{name}.mq.md"
        dest.write_text(mq, encoding="utf-8")
        base, media, anim = rows_from_css(css)
        print(f"{name}: base={len(base)} media={len(media)} keyframes={len(anim)} → {dest}")


if __name__ == "__main__":
    main()
