/**
 * Math-safe Markdown + KaTeX for 求道量子.
 *
 * Marqdo's GFM pass treats math as prose: `\\` becomes <br>, `\(` loses
 * the backslash, `_ij_` becomes <em>, and a lone `=` line becomes a
 * setext heading. Extract TeX first, render Markdown, then paint KaTeX.
 */
(function () {
  "use strict";

  var MATH_RE = [
    /\$\$[\s\S]+?\$\$/g,
    /\\\[[\s\S]+?\\\]/g,
    /\\\([\s\S]+?\\\)/g,
    /(?<!\$)\$(?!\$)(?:\\.|[^$\n])+\$/g,
  ];
  var FENCE_RE = /```[\s\S]*?```|`[^`\n]+`/g;
  var PH = "@@MQMATH";
  var FH = "@@MQFENCE";

  function katexReady() {
    return typeof katex === "object" && typeof katex.renderToString === "function";
  }

  function extractMath(src) {
    var fences = [];
    var maths = [];
    var text = String(src || "").replace(/\r\n?/g, "\n");
    text = text.replace(FENCE_RE, function (m) {
      fences.push(m);
      return FH + (fences.length - 1) + "@@";
    });
    MATH_RE.forEach(function (re) {
      re.lastIndex = 0;
      text = text.replace(re, function (m) {
        maths.push(m);
        return PH + (maths.length - 1) + "@@";
      });
    });
    text = text.replace(/@@MQFENCE(\d+)@@/g, function (_, i) {
      return fences[Number(i)] || "";
    });
    return { text: text, maths: maths };
  }

  function unwrapTex(raw) {
    var s = String(raw || "").trim();
    if (s.slice(0, 2) === "$$" && s.slice(-2) === "$$") return { tex: s.slice(2, -2), display: true };
    if (s.slice(0, 2) === "\\[" && s.slice(-2) === "\\]") return { tex: s.slice(2, -2), display: true };
    if (s.slice(0, 2) === "\\(" && s.slice(-2) === "\\)") return { tex: s.slice(2, -2), display: false };
    if (s.charAt(0) === "$" && s.charAt(s.length - 1) === "$") return { tex: s.slice(1, -1), display: false };
    return { tex: s, display: /\\begin\{|\\\\/.test(s) };
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderTex(raw) {
    var u = unwrapTex(raw);
    if (!katexReady()) return '<code class="mq-math-src">' + escapeHtml(raw) + "</code>";
    try {
      return katex.renderToString(u.tex.trim(), {
        displayMode: u.display,
        throwOnError: false,
        strict: "ignore",
        trust: false,
        output: "html",
      });
    } catch (e) {
      return '<code class="mq-math-src">' + escapeHtml(raw) + "</code>";
    }
  }

  function markdownToHtml(md) {
    var parse = null;
    if (typeof marked === "function") parse = marked.parse || marked;
    else if (marked && typeof marked.parse === "function") parse = marked.parse;
    else if (marked && typeof marked.marked === "function") parse = marked.marked;
    if (parse) return parse(md, { gfm: true, breaks: false });
    return "<p>" + escapeHtml(md).replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br>") + "</p>";
  }

  function renderMarkdownWithMath(src) {
    var packed = extractMath(src);
    var html = markdownToHtml(packed.text);
    html = html.replace(/<p>\s*@@MQMATH(\d+)@@\s*<\/p>/g, function (_, i) {
      return renderTex(packed.maths[Number(i)]);
    });
    html = html.replace(/@@MQMATH(\d+)@@/g, function (_, i) {
      return renderTex(packed.maths[Number(i)]);
    });
    return html;
  }

  function paint(el, src) {
    if (!el) return;
    el.innerHTML = renderMarkdownWithMath(src);
    el.classList.add("mq-math-ready");
  }

  function slugFromPath() {
    var m = location.pathname.match(/\/post\/([^/]+)/);
    return m ? decodeURIComponent(m[1]) : "";
  }

  function rowsFromApi(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.rows)) return data.rows;
    return [];
  }

  function hydrateArticle() {
    var body = document.querySelector(".article-body.md, .article .article-body");
    if (!body) return Promise.resolve(false);
    var slug = slugFromPath();
    if (!slug) return Promise.resolve(false);
    return fetch("/api/posts", { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("posts " + res.status);
        return res.json();
      })
      .then(function (data) {
        var row = rowsFromApi(data).find(function (r) {
          return r && String(r.slug) === slug;
        });
        if (!row || row.content == null) return false;
        paint(body, String(row.content));
        return true;
      })
      .catch(function () {
        return false;
      });
  }

  function closestPreview(ta) {
    var root = ta.closest(".md-field, .md-editor, .md-body, label, .site-form") || ta.parentElement;
    if (!root) return null;
    return (
      root.querySelector(".mq-md-preview, .md-preview, .md-preview-scroll .md-preview") ||
      (ta.nextElementSibling && ta.nextElementSibling.matches(".mq-md-preview, .md-preview")
        ? ta.nextElementSibling
        : null)
    );
  }

  function bindEditor(ta) {
    if (!ta || ta.dataset.mqMathBound === "1") return;
    var preview = closestPreview(ta);
    if (!preview) return;
    ta.dataset.mqMathBound = "1";
    var applying = false;
    var timer = 0;

    function apply() {
      applying = true;
      paint(preview, ta.value || "");
      queueMicrotask(function () {
        applying = false;
      });
    }

    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(apply, 80);
    }

    apply();
    ta.addEventListener("input", schedule);
    ta.addEventListener("change", schedule);
    if (typeof MutationObserver === "function") {
      var obs = new MutationObserver(function () {
        if (applying) return;
        schedule();
      });
      obs.observe(preview, { childList: true, subtree: true, characterData: true });
    }
  }

  function scanEditors() {
    document.querySelectorAll("textarea.mq-markdown, textarea.md-source, .md-editor textarea").forEach(bindEditor);
  }

  function boot() {
    if (!katexReady()) return;
    if (/\/post\//.test(location.pathname)) hydrateArticle();
    scanEditors();
    if (typeof MutationObserver === "function" && document.querySelector("textarea.mq-markdown, textarea.md-source, .md-editor textarea")) {
      var obs = new MutationObserver(function () {
        scanEditors();
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
