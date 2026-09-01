---
title: styles/editor
description: 写作台编辑器样式。
import 网页:ext/web/网页.mq.md
import text:lib/text.mq.md
---

由 public/editor.css 迁入的样式表。含 `/` 的值已加引号（Marqdo 0.3.2+）。
禁止在本文件顶层使用无序列表符号。

## 规则

`规则` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| body:has(.site-form.editor-skin), body.desk-list | grid-template-columns | 1fr |
| body:has(.site-form.editor-skin), body.desk-list | grid-template-areas | "\"top\" \"main\" \"foot\"" |
| body:has(.site-form.editor-skin) aside.side, body:has(.site-form.editor-skin) .mq-img.brand-logo, body.desk-list aside.side, body.desk-list .mq-img.brand-logo | display | none |
| body:has(.site-form.editor-skin) main.main, body.desk-list main.main | padding | 1.1rem 1.25rem 2.5rem |
| body:has(.site-form.editor-skin) main.main, body.desk-list main.main | max-width | 1280px |
| body:has(.site-form.editor-skin) main.main, body.desk-list main.main | width | 100% |
| body:has(.site-form.editor-skin) main.main, body.desk-list main.main | margin | 0 auto |
| body:has(.site-form.editor-skin) .main-intro, body.desk-list .main-intro | margin-bottom | .85rem |
| body:has(.site-form.editor-skin) .main-intro, body.desk-list .main-intro | max-width | none |
| body:has(.site-form.editor-skin) .main-intro h1, body.desk-list .main-intro h1 | font-size | clamp(1.55rem, 2.6vw, 1.95rem) |
| body:has(.site-form.editor-skin) .main-intro h1, body.desk-list .main-intro h1 | letter-spacing | .03em |
| body:has(.site-form.editor-skin) .main-intro h1, body.desk-list .main-intro h1 | border-left-width | 3px |
| body:has(.site-form.editor-skin) .main-intro h1, body.desk-list .main-intro h1 | padding-left | .7rem |
| body:has(.site-form.editor-skin) .main-intro p.lede, body:has(.site-form.editor-skin) .main-intro p, body.desk-list .main-intro p.lede, body.desk-list .main-intro p | max-width | 40rem |
| body:has(.site-form.editor-skin) .main-intro p.lede, body:has(.site-form.editor-skin) .main-intro p, body.desk-list .main-intro p.lede, body.desk-list .main-intro p | font-size | .95rem |
| body:has(.site-form.editor-skin) .main-intro p.lede, body:has(.site-form.editor-skin) .main-intro p, body.desk-list .main-intro p.lede, body.desk-list .main-intro p | margin-top | .35rem |
| body:has(.site-form.editor-skin) footer.foot, body.desk-list footer.foot | margin-top | 0 |
| main.main:has(> .site-form):has(> .content.cards):not(.desk-writing) > .site-form | display | none !important |
| main.main.desk-writing > .site-form | display | block !important |
| main.main.desk-writing > .content.cards, main.main.desk-writing > .pub-list-head, main.main.desk-writing > .pub-compose-bar | display | none !important |
| .site-form.editor-skin | max-width | none |
| .site-form.editor-skin | margin | 0 |
| .site-form.editor-skin | width | 100% |
| .site-form.editor-skin | padding | 1.35rem 1.5rem 1.4rem |
| .site-form.editor-skin | background | var(--card) |
| .site-form.editor-skin | border | 1px solid var(--line) |
| .site-form.editor-skin | border-radius | 2px |
| .site-form.editor-skin | box-shadow | none |
| .site-form.editor-skin | backdrop-filter | none |
| .site-form.editor-skin | -webkit-backdrop-filter | none |
| .site-form.editor-skin .meta | display | none |
| .site-form.editor-skin form | display | block |
| .pub-meta | display | grid |
| .pub-meta | gap | 1rem |
| .pub-meta | margin-bottom | 1.15rem |
| .pub-meta | padding-bottom | 1.1rem |
| .pub-meta | border-bottom | 1px solid var(--line) |
| .pub-field | margin | 0 |
| .pub-field | display | grid |
| .pub-field | gap | .4rem |
| .site-form.editor-skin .pub-title | font-size | 0 |
| .site-form.editor-skin .pub-title | gap | 0 |
| .site-form.editor-skin .pub-title | display | block |
| .site-form.editor-skin .pub-title | margin-bottom | .15rem |
| .site-form.editor-skin .pub-title input | display | block |
| .site-form.editor-skin .pub-title input | width | 100% |
| .site-form.editor-skin .pub-title input | font-family | var(--serif) |
| .site-form.editor-skin .pub-title input | font-size | clamp(1.55rem, 2.8vw, 2.1rem) |
| .site-form.editor-skin .pub-title input | font-weight | 800 |
| .site-form.editor-skin .pub-title input | line-height | 1.3 |
| .site-form.editor-skin .pub-title input | letter-spacing | .01em |
| .site-form.editor-skin .pub-title input | padding | .2rem .05rem .55rem |
| .site-form.editor-skin .pub-title input | border | 0 |
| .site-form.editor-skin .pub-title input | border-bottom | 2px solid var(--line) |
| .site-form.editor-skin .pub-title input | border-radius | 0 |
| .site-form.editor-skin .pub-title input | background | transparent |
| .site-form.editor-skin .pub-title input | color | var(--ink) |
| .site-form.editor-skin .pub-title input | caret-color | var(--accent) |
| .site-form.editor-skin .pub-title input | transition | border-color .16s ease, box-shadow .16s ease |
| .site-form.editor-skin .pub-title input::placeholder | color | var(--faint) |
| .site-form.editor-skin .pub-title input::placeholder | opacity | 1 |
| .site-form.editor-skin .pub-title input:focus | outline | none |
| .site-form.editor-skin .pub-title input:focus | border-bottom-color | var(--accent) |
| .site-form.editor-skin .pub-title input:focus | box-shadow | 0 1px 0 var(--accent) |
| .pub-row2 | display | grid |
| .pub-row2 | grid-template-columns | 1.2fr 0.8fr |
| .pub-row2 | gap | .85rem |
| .pub-row3 | display | grid |
| .pub-row3 | grid-template-columns | 1.2fr 0.8fr |
| .pub-row3 | gap | .85rem |
| .pub-row3 | align-items | end |
| .site-form.editor-skin .pub-meta select | background | color-mix(in srgb, var(--bg-2) 70%, transparent) |
| .site-form.editor-skin .pub-meta select | border | 1px solid var(--line) |
| .site-form.editor-skin .pub-meta select | border-radius | 8px |
| .site-form.editor-skin .pub-meta select | padding | .55rem .75rem |
| .site-form.editor-skin .pub-meta select | color | var(--ink) |
| .site-form.editor-skin .pub-meta select | font | inherit |
| .site-form.editor-skin .pub-pinned | text-transform | none |
| .site-form.editor-skin .pub-pinned | letter-spacing | 0 |
| .site-form.editor-skin .pub-pinned | font-size | .9rem |
| .site-form.editor-skin .pub-pinned | color | var(--ink-soft) |
| .site-form.editor-skin .pub-pin-toggle | display | inline-flex |
| .site-form.editor-skin .pub-pin-toggle | align-items | center |
| .site-form.editor-skin .pub-pin-toggle | gap | .45rem |
| .site-form.editor-skin .pub-pin-toggle | margin-top | .35rem |
| .site-form.editor-skin .pub-pin-toggle | cursor | pointer |
| .site-form.editor-skin .pub-pin-toggle | text-transform | none |
| .site-form.editor-skin .pub-pin-toggle | letter-spacing | 0 |
| .site-form.editor-skin .pub-pin-toggle | font-size | .92rem |
| .site-form.editor-skin .pub-pin-toggle | color | var(--ink) |
| .site-form.editor-skin .pub-pin-toggle input | width | 1rem |
| .site-form.editor-skin .pub-pin-toggle input | height | 1rem |
| .site-form.editor-skin .pub-summary | gap | .35rem |
| .site-form.editor-skin .pub-summary textarea | min-height | 3.6rem |
| .site-form.editor-skin .pub-summary textarea | resize | vertical |
| .site-form.editor-skin .pub-summary textarea | line-height | 1.55 |
| .site-form.editor-skin .pub-meta label | font-size | .78rem |
| .site-form.editor-skin .pub-meta label | letter-spacing | .06em |
| .site-form.editor-skin .pub-meta label | text-transform | uppercase |
| .site-form.editor-skin .pub-meta label | color | var(--faint) |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]), .site-form.editor-skin .pub-meta textarea | background | color-mix(in srgb, var(--bg-2) 70%, transparent) |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]), .site-form.editor-skin .pub-meta textarea | border | 1px solid var(--line) |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]), .site-form.editor-skin .pub-meta textarea | border-radius | 8px |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]), .site-form.editor-skin .pub-meta textarea | padding | .55rem .75rem |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]), .site-form.editor-skin .pub-meta textarea | transition | border-color .16s ease, box-shadow .16s ease, background-color .16s ease |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]):hover, .site-form.editor-skin .pub-meta textarea:hover | border-color | color-mix(in srgb, var(--accent) 40%, transparent) |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]):focus, .site-form.editor-skin .pub-meta textarea:focus | outline | none |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]):focus, .site-form.editor-skin .pub-meta textarea:focus | border-color | var(--accent) |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]):focus, .site-form.editor-skin .pub-meta textarea:focus | box-shadow | 0 0 0 3px color-mix(in srgb, var(--accent) 16%, transparent) |
| .site-form.editor-skin .pub-meta input:not([type="hidden"]):focus, .site-form.editor-skin .pub-meta textarea:focus | background | var(--card) |
| .site-form.editor-skin .pub-meta input::placeholder, .site-form.editor-skin .pub-meta textarea::placeholder | color | var(--faint) |
| .site-form.editor-skin .pub-meta input::placeholder, .site-form.editor-skin .pub-meta textarea::placeholder | opacity | 1 |
| .md-field | display | grid |
| .md-field | gap | 0 |
| .md-field > .md-field-label | display | none |
| .md-field .md-hidden | display | none |
| .md-editor | display | flex |
| .md-editor | flex-direction | column |
| .md-editor | border | 1px solid var(--line) |
| .md-editor | border-radius | 2px |
| .md-editor | background | var(--card) |
| .md-editor | overflow | hidden |
| .md-editor | min-height | min(68vh, 44rem) |
| .md-editor | transition | border-color .18s ease |
| .md-editor:focus-within | border-color | var(--accent) |
| .md-editor:focus-within | box-shadow | none |
| .md-toolbar | display | flex |
| .md-toolbar | align-items | center |
| .md-toolbar | justify-content | space-between |
| .md-toolbar | gap | .5rem |
| .md-toolbar | flex-wrap | wrap |
| .md-toolbar | flex | none |
| .md-toolbar | padding | .42rem .55rem |
| .md-toolbar | border-bottom | 1px solid var(--line) |
| .md-toolbar | background | color-mix(in srgb, var(--bg-2) 92%, var(--card)) |
| .md-toolbar | position | relative |
| .md-toolbar | z-index | 2 |
| .md-tools | display | flex |
| .md-tools | align-items | center |
| .md-tools | gap | .12rem |
| .md-tools | flex-wrap | wrap |
| .md-toolbar .md-meta | display | flex |
| .md-toolbar .md-meta | align-items | center |
| .md-toolbar .md-meta | gap | .12rem |
| .md-toolbar .md-meta | margin-left | auto |
| .md-toolbar .md-meta | flex | none |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | width | 2rem |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | height | 2rem |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | padding | 0 |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | display | inline-flex |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | align-items | center |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | justify-content | center |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | border | 0 |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | border-radius | 7px |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | background | transparent |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | color | var(--muted) |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | font | inherit |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | font-size | .84rem |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | line-height | 1 |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | cursor | pointer |
| .md-toolbar .tool-btn, .md-toolbar .md-btn | transition | color .13s ease, background-color .13s ease, transform .06s ease |
| .md-toolbar .tool-btn:hover, .md-toolbar .md-btn:hover | color | var(--ink) |
| .md-toolbar .tool-btn:hover, .md-toolbar .md-btn:hover | background | color-mix(in srgb, var(--accent) 12%, transparent) |
| .md-toolbar .tool-btn:active, .md-toolbar .md-btn:active | transform | translateY(1px) |
| .md-toolbar .md-btn.on | color | var(--accent) |
| .md-toolbar .md-btn.on | background | color-mix(in srgb, var(--accent) 14%, transparent) |
| .md-toolbar .md-sep | width | 1px |
| .md-toolbar .md-sep | height | 1.4rem |
| .md-toolbar .md-sep | margin | 0 .28rem |
| .md-toolbar .md-sep | background | var(--line) |
| .md-toolbar .md-sep | flex | none |
| .md-drop | position | relative |
| .md-drop > .md-btn | padding | 0 .35rem |
| .md-drop > .md-btn | gap | .1rem |
| .md-caret | display | inline-flex |
| .md-caret | align-items | center |
| .md-caret | opacity | .75 |
| .md-drop-menu | display | none |
| .md-drop-menu | position | absolute |
| .md-drop-menu | top | calc(100% + 6px) |
| .md-drop-menu | left | 0 |
| .md-drop-menu | min-width | 11rem |
| .md-drop-menu | padding | .35rem |
| .md-drop-menu | background | var(--card) |
| .md-drop-menu | border | 1px solid var(--line) |
| .md-drop-menu | border-radius | 10px |
| .md-drop-menu | box-shadow | var(--glow-2) |
| .md-drop-menu | z-index | 20 |
| .md-drop.open .md-drop-menu | display | block |
| .md-drop-item | display | flex |
| .md-drop-item | align-items | center |
| .md-drop-item | gap | .6rem |
| .md-drop-item | width | 100% |
| .md-drop-item | padding | .38rem .6rem |
| .md-drop-item | border | 0 |
| .md-drop-item | border-radius | 7px |
| .md-drop-item | background | transparent |
| .md-drop-item | color | var(--ink-soft) |
| .md-drop-item | font | inherit |
| .md-drop-item | font-size | .86rem |
| .md-drop-item | text-align | left |
| .md-drop-item | cursor | pointer |
| .md-drop-item | transition | background-color .12s ease, color .12s ease |
| .md-drop-item b | min-width | 1.7rem |
| .md-drop-item b | font-weight | 700 |
| .md-drop-item b | color | var(--muted) |
| .md-drop-item:hover | background | color-mix(in srgb, var(--accent) 12%, transparent) |
| .md-drop-item:hover | color | var(--ink) |
| .md-drop-item:hover b | color | var(--accent) |
| .md-body | display | grid |
| .md-body | grid-template-columns | 1fr 1fr |
| .md-body | flex | 1 1 auto |
| .md-body | min-height | min(58vh, 38rem) |
| .md-body | min-width | 0 |
| .md-pane | min-width | 0 |
| .md-pane | position | relative |
| .md-pane | display | flex |
| .md-pane | flex-direction | column |
| .md-pane | background | var(--card) |
| .md-pane + .md-pane | border-left | 1px solid var(--line) |
| .md-pane .md-pane-tag | position | static |
| .md-pane .md-pane-tag | display | inline-flex |
| .md-pane .md-pane-tag | align-self | flex-start |
| .md-pane .md-pane-tag | margin | .55rem .7rem .15rem |
| .md-pane .md-pane-tag | padding | .14rem .55rem |
| .md-pane .md-pane-tag | font-size | .68rem |
| .md-pane .md-pane-tag | letter-spacing | .14em |
| .md-pane .md-pane-tag | text-transform | uppercase |
| .md-pane .md-pane-tag | color | var(--faint) |
| .md-pane .md-pane-tag | background | color-mix(in srgb, var(--bg-2) 80%, transparent) |
| .md-pane .md-pane-tag | border | 1px solid var(--line) |
| .md-pane .md-pane-tag | border-radius | 5px |
| .md-pane .md-pane-tag | pointer-events | none |
| .md-pane .md-pane-tag | user-select | none |
| .md-pane .md-pane-tag | z-index | auto |
| .md-scroll | position | relative |
| .md-scroll | flex | 1 1 auto |
| .md-scroll | display | flex |
| .md-scroll | min-height | 0 |
| .md-scroll | overflow | auto |
| .line-numbers | position | absolute |
| .line-numbers | left | 0 |
| .line-numbers | top | 0 |
| .line-numbers | bottom | 0 |
| .line-numbers | width | 3rem |
| .line-numbers | flex | none |
| .line-numbers | overflow | hidden |
| .line-numbers | padding | .85rem 0 1rem |
| .line-numbers | border-right | 1px solid var(--line) |
| .line-numbers | background | color-mix(in srgb, var(--bg-2) 55%, transparent) |
| .line-numbers | text-align | right |
| .line-numbers | pointer-events | none |
| .line-numbers | user-select | none |
| .line-numbers span | display | block |
| .line-numbers span | padding-right | .55rem |
| .line-numbers span | color | var(--faint) |
| .line-numbers span | font-family | "\"SF Mono\", \"Fira Code\", \"JetBrains Mono\", \"Cascadia Code\", Monaco, Consolas, monospace" |
| .line-numbers span | font-size | .875rem |
| .line-numbers span | line-height | 1.7 |
| .site-form.editor-skin .md-source | display | block |
| .site-form.editor-skin .md-source | flex | 1 |
| .site-form.editor-skin .md-source | width | 100% |
| .site-form.editor-skin .md-source | min-width | 0 |
| .site-form.editor-skin .md-source | min-height | min(52vh, 34rem) |
| .site-form.editor-skin .md-source | padding | .85rem 1.2rem 1.4rem 3.55rem |
| .site-form.editor-skin .md-source | border | 0 |
| .site-form.editor-skin .md-source | border-radius | 0 |
| .site-form.editor-skin .md-source | background | transparent |
| .site-form.editor-skin .md-source | color | var(--ink) |
| .site-form.editor-skin .md-source | font-family | "\"SF Mono\", \"Fira Code\", \"JetBrains Mono\", \"Cascadia Code\", Monaco, Consolas, monospace" |
| .site-form.editor-skin .md-source | font-size | .875rem |
| .site-form.editor-skin .md-source | line-height | 1.7 |
| .site-form.editor-skin .md-source | resize | vertical |
| .site-form.editor-skin .md-source | tab-size | 4 |
| .site-form.editor-skin .md-source | caret-color | var(--accent) |
| .site-form.editor-skin .md-source:focus | outline | none |
| .site-form.editor-skin .md-source:focus | box-shadow | none |
| .site-form.editor-skin .md-source::placeholder | color | var(--faint) |
| .site-form.editor-skin .md-source::placeholder | opacity | .8 |
| .md-pane-preview | background | linear-gradient(165deg, var(--card), color-mix(in srgb, var(--card-2) 80%, var(--card))) |
| .md-preview-scroll | flex | 1 1 auto |
| .md-preview-scroll | min-height | 0 |
| .md-preview-scroll | overflow | auto |
| .md-preview | padding | .85rem 1.45rem 2rem |
| .md-preview | color | var(--ink-soft) |
| .md-preview | font-size | .96rem |
| .md-preview | overflow-wrap | break-word |
| .md-preview > :first-child | margin-top | 0 |
| .md-preview .md-empty | color | var(--faint) |
| .md-preview .md-empty | font-style | italic |
| .md-preview h1, .md-preview h2, .md-preview h3, .md-preview h4, .md-preview h5, .md-preview h6 | font-family | var(--serif) |
| .md-preview h1, .md-preview h2, .md-preview h3, .md-preview h4, .md-preview h5, .md-preview h6 | color | var(--ink) |
| .md-preview h1, .md-preview h2, .md-preview h3, .md-preview h4, .md-preview h5, .md-preview h6 | margin | 1.45rem 0 .55rem |
| .md-preview h1, .md-preview h2, .md-preview h3, .md-preview h4, .md-preview h5, .md-preview h6 | line-height | 1.35 |
| .md-preview h1 | font-size | 1.7rem |
| .md-preview h2 | font-size | 1.35rem |
| .md-preview h2 | border-left | 3px solid var(--accent) |
| .md-preview h2 | padding-left | .55rem |
| .md-preview h3 | font-size | 1.15rem |
| .md-preview h3 | color | var(--ink-soft) |
| .md-preview h4 | font-size | 1.02rem |
| .md-preview p | margin | .55rem 0 |
| .md-preview a | color | var(--accent-3) |
| .md-preview a:hover | color | var(--accent) |
| .md-preview a:hover | text-decoration | underline |
| .md-preview blockquote | margin | 1rem 0 |
| .md-preview blockquote | padding | .6rem 1.05rem |
| .md-preview blockquote | border-left | 3px solid var(--accent) |
| .md-preview blockquote | background | color-mix(in srgb, var(--accent) 7%, transparent) |
| .md-preview blockquote | color | var(--muted) |
| .md-preview code | padding | .12rem .38rem |
| .md-preview code | border-radius | 5px |
| .md-preview code | background | color-mix(in srgb, var(--ink) 7%, transparent) |
| .md-preview code | color | var(--accent-2) |
| .md-preview code | font-family | "\"SF Mono\", \"Fira Code\", \"JetBrains Mono\", \"Cascadia Code\", Monaco, Consolas, monospace" |
| .md-preview code | font-size | .86em |
| .md-preview pre | padding | .85rem 1.05rem |
| .md-preview pre | border-radius | 10px |
| .md-preview pre | background | var(--code-bg) |
| .md-preview pre | border | 1px solid var(--line) |
| .md-preview pre | overflow-x | auto |
| .md-preview pre | margin | 1rem 0 |
| .md-preview pre code | padding | 0 |
| .md-preview pre code | background | transparent |
| .md-preview pre code | color | #a8e7f5 |
| .md-preview ul, .md-preview ol | padding-left | 1.45rem |
| .md-preview ul, .md-preview ol | margin | .5rem 0 |
| .md-preview li | margin | .22rem 0 |
| .md-preview li > p | margin | .15rem 0 |
| .md-preview hr | border | 0 |
| .md-preview hr | height | 1px |
| .md-preview hr | background | var(--line) |
| .md-preview hr | margin | 1.5rem 0 |
| .md-preview img | max-width | 100% |
| .md-preview img | border-radius | 10px |
| .md-preview img | border | 1px solid var(--line) |
| .md-preview table | border-collapse | collapse |
| .md-preview table | margin | 1rem 0 |
| .md-preview table | width | 100% |
| .md-preview table | font-size | .9rem |
| .md-preview th, .md-preview td | border | 1px solid var(--line) |
| .md-preview th, .md-preview td | padding | .45rem .7rem |
| .md-preview th, .md-preview td | text-align | left |
| .md-preview th | background | color-mix(in srgb, var(--accent) 10%, transparent) |
| .md-preview th | color | var(--ink) |
| .md-preview th | font-weight | 600 |
| .md-preview tr:nth-child(even) td | background | color-mix(in srgb, var(--line) 6%, transparent) |
| .md-preview del | color | var(--faint) |
| .md-status | display | flex |
| .md-status | align-items | center |
| .md-status | gap | .55rem |
| .md-status | padding | .4rem .9rem |
| .md-status | border-top | 1px solid var(--line) |
| .md-status | background | color-mix(in srgb, var(--bg-2) 88%, transparent) |
| .md-status | font-size | .76rem |
| .md-status | color | var(--faint) |
| .md-status | user-select | none |
| .md-status-item | white-space | nowrap |
| .md-status-item | font-variant-numeric | tabular-nums |
| .md-status-bar | color | var(--line) |
| .md-status-right | margin-left | auto |
| .md-status-right | display | flex |
| .md-status-right | align-items | center |
| .md-status-sync | display | inline-flex |
| .md-status-sync | align-items | center |
| .md-status-sync | gap | .38rem |
| .md-status-sync | cursor | pointer |
| .md-status-sync | color | var(--muted) |
| .md-status-sync | transition | color .13s ease |
| .md-status-sync:hover | color | var(--ink) |
| .md-status-sync input | width | .85rem |
| .md-status-sync input | height | .85rem |
| .md-status-sync input | margin | 0 |
| .md-status-sync input | accent-color | var(--accent) |
| .md-status-sync input | cursor | pointer |
| .site-form.editor-skin .actions | display | flex |
| .site-form.editor-skin .actions | flex-direction | row-reverse |
| .site-form.editor-skin .actions | align-items | center |
| .site-form.editor-skin .actions | gap | 1rem |
| .site-form.editor-skin .actions | margin-top | 1.15rem |
| .site-form.editor-skin .actions | padding | .95rem 0 0 |
| .site-form.editor-skin .actions | border-top | 1px solid var(--line) |
| .site-form.editor-skin .actions | position | sticky |
| .site-form.editor-skin .actions | bottom | 0 |
| .site-form.editor-skin .actions | background | linear-gradient(180deg, transparent, color-mix(in srgb, var(--card) 92%, transparent) 28%) |
| .site-form.editor-skin .actions | z-index | 5 |
| .site-form.editor-skin .actions button | padding | .7rem 2.1rem |
| .site-form.editor-skin .actions button | font-size | .95rem |
| .site-form.editor-skin .actions button | letter-spacing | .05em |
| .site-form.editor-skin .actions button | border-radius | 2px |
| .site-form.editor-skin .actions button | background | var(--accent) |
| .site-form.editor-skin .actions button | background-image | none |
| .site-form.editor-skin .actions button | box-shadow | none |
| .site-form.editor-skin .actions button | transition | filter .15s ease |
| .site-form.editor-skin .actions button:hover | filter | brightness(1.06) |
| .site-form.editor-skin .actions button:hover | box-shadow | none |
| .site-form.editor-skin .actions button:hover | transform | none |
| .site-form.editor-skin .actions a | color | var(--faint) |
| .site-form.editor-skin .actions a | padding | .45rem .7rem |
| .site-form.editor-skin .actions a | border-radius | 7px |
| .site-form.editor-skin .actions a | transition | color .15s ease, background-color .15s ease |
| .site-form.editor-skin .actions a:hover | color | var(--muted) |
| .site-form.editor-skin .actions a:hover | background | color-mix(in srgb, var(--ink) 5%, transparent) |
| .md-editor.full | position | fixed |
| .md-editor.full | inset | 0 |
| .md-editor.full | z-index | 60 |
| .md-editor.full | border | 0 |
| .md-editor.full | border-radius | 0 |
| .md-editor.full | box-shadow | none |
| .md-editor.full | min-height | 100vh |
| .md-editor.full .md-toolbar | position | sticky |
| .md-editor.full .md-toolbar | top | 0 |
| .md-editor.full .md-toolbar | z-index | 4 |
| .md-editor.full .md-body | flex | 1 |
| .md-editor.full .md-body | min-height | 0 |
| .md-editor.full .md-scroll, .md-editor.full .md-preview-scroll, .md-editor.full .md-source | min-height | 0 |
| .md-editor.full .md-source | height | 100% |
| .edit-status | margin | 0.65rem 0 0 |
| .edit-status | font-family | var(--mono, ui-monospace, Consolas, monospace) |
| .edit-status | font-size | 0.78rem |
| .edit-status | letter-spacing | 0.04em |
| .edit-status | color | var(--muted) |
| .edit-status.is-ready | color | var(--accent) |
| .edit-status.is-error | color | var(--mark, #c45c26) |
| .edit-status a | color | inherit |
| .edit-status a | text-decoration | underline |
| .pub-compose-bar | display | flex |
| .pub-compose-bar | flex-wrap | wrap |
| .pub-compose-bar | align-items | center |
| .pub-compose-bar | gap | 0.85rem 1.25rem |
| .pub-compose-bar | margin | 0.35rem 0 1.5rem |
| .pub-compose-bar | padding | 1rem 0 1.25rem |
| .pub-compose-bar | border-bottom | 1px solid var(--line) |
| .pub-new-btn | display | inline-flex |
| .pub-new-btn | align-items | center |
| .pub-new-btn | justify-content | center |
| .pub-new-btn | padding | 0.65rem 1.25rem |
| .pub-new-btn | border | 1px solid var(--ink) |
| .pub-new-btn | background | var(--ink) |
| .pub-new-btn | color | var(--bg) !important |
| .pub-new-btn | font-family | var(--mono, ui-monospace, Consolas, monospace) |
| .pub-new-btn | font-size | 0.78rem |
| .pub-new-btn | letter-spacing | 0.12em |
| .pub-new-btn | text-decoration | none !important |
| .pub-new-btn | text-transform | uppercase |
| .pub-new-btn:hover | background | var(--accent) |
| .pub-new-btn:hover | border-color | var(--accent) |
| .pub-new-btn:hover | color | #fff !important |
| .pub-compose-hint | margin | 0 |
| .pub-compose-hint | color | var(--muted) |
| .pub-compose-hint | font-size | 0.9rem |
| body.desk-list .pub-list-head, body:has(.site-form.editor-skin) .pub-list-head | margin | 0.5rem 0 0.85rem |
| body.desk-list .pub-list-head, body:has(.site-form.editor-skin) .pub-list-head | padding-top | 0 |
| body.desk-list .pub-list-head, body:has(.site-form.editor-skin) .pub-list-head | border-top | 0 |
| body.desk-list .pub-list-head, body:has(.site-form.editor-skin) .pub-list-head | max-width | none |
| body.desk-list .pub-list-head h2, body:has(.site-form.editor-skin) .pub-list-head h2 | margin | 0 |
| body.desk-list .pub-list-head h2, body:has(.site-form.editor-skin) .pub-list-head h2 | font-family | var(--serif, Georgia, serif) |
| body.desk-list .pub-list-head h2, body:has(.site-form.editor-skin) .pub-list-head h2 | font-size | 1.2rem |
| body.desk-list .pub-list-head h2, body:has(.site-form.editor-skin) .pub-list-head h2 | letter-spacing | 0.08em |
| body.desk-list .pub-list-head p, body:has(.site-form.editor-skin) .pub-list-head p | margin | 0.35rem 0 0 |
| body.desk-list .pub-list-head p, body:has(.site-form.editor-skin) .pub-list-head p | color | var(--muted) |
| body.desk-list .pub-list-head p, body:has(.site-form.editor-skin) .pub-list-head p | font-size | 0.9rem |
| body.desk-list .content.cards.pub-list, body:has(.site-form.editor-skin) .content.cards.pub-list | max-width | none |
| body.desk-list .content.cards.pub-list .card-link, body:has(.site-form.editor-skin) .content.cards.pub-list .card-link | position | relative |
| body.desk-list .content.cards.pub-list .card-link, body:has(.site-form.editor-skin) .content.cards.pub-list .card-link | padding-right | 3.5rem |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | position | absolute |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | right | 0.15rem |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | top | 50% |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | transform | translateY(-50%) |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | font-family | var(--mono, ui-monospace, Consolas, monospace) |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | font-size | 0.68rem |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | letter-spacing | 0.14em |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | text-transform | uppercase |
| body.desk-list .content.cards.pub-list .pub-edit-tip, body:has(.site-form.editor-skin) .content.cards.pub-list .pub-edit-tip | color | var(--mark, #c45c26) |
| body:has(.site-form.editor-skin) .content.cards.pub-list .card-link.is-active-edit | outline | 1px solid var(--accent) |
| body:has(.site-form.editor-skin) .content.cards.pub-list .card-link.is-active-edit | outline-offset | 2px |
| body:has(.site-form.editor-skin) .content.cards.pub-list .card-link.is-active-edit .pub-edit-tip | color | var(--accent) |
| .pub-empty | margin | 1rem 0 0 |
| .pub-empty | color | var(--muted) |
| .pub-empty | font-size | 0.95rem |
| .site-form.editor-skin .pub-id-hidden, .site-form.editor-skin input[name="id"][type="hidden"] | display | none !important |
| .site-form.editor-skin.is-editing .actions button:disabled | opacity | 0.55 |
| .site-form.editor-skin.is-editing .actions button:disabled | cursor | wait |

**`规则`**

## 响应式

`响应式` =

| 媒体 | 选择器 | 属性 | 值 |
|------|--------|------|-----|
| (max-width: 860px) | body:has(.site-form.editor-skin) main.main | padding | 1rem .85rem 2rem |
| (max-width: 860px) | .site-form.editor-skin | padding | 1.05rem .95rem 1.2rem |
| (max-width: 860px) | .site-form.editor-skin | border-radius | 12px |
| (max-width: 860px) | .pub-row2, .pub-row3 | grid-template-columns | 1fr |
| (max-width: 860px) | .md-toolbar | position | static |
| (max-width: 860px) | .md-editor, .md-body, .md-scroll, .md-preview-scroll, .site-form.editor-skin .md-source | min-height | 22rem |
| (max-width: 860px) | .md-body | grid-template-columns | 1fr |
| (max-width: 860px) | .md-pane + .md-pane | border-left | 0 |
| (max-width: 860px) | .md-pane + .md-pane | border-top | 1px solid var(--line) |
| (max-width: 860px) | .md-body.md-view-edit .md-pane-preview | display | none |
| (max-width: 860px) | .md-body.md-view-preview .md-pane-edit | display | none |
| (max-width: 860px) | .md-btn.md-preview-toggle | border | 1px solid color-mix(in srgb, var(--accent) 35%, transparent) |
| (max-width: 860px) | .md-btn.md-preview-toggle | color | var(--accent) |
| (max-width: 860px) | .site-form.editor-skin .actions | position | static |
| (max-width: 860px) | .site-form.editor-skin .actions | background | transparent |
| (min-width: 861px) | .md-btn.md-preview-toggle | display | none |
| (prefers-reduced-motion: reduce) | .site-form.editor-skin .actions button, .md-toolbar .tool-btn, .md-toolbar .md-btn | transition | none |
| (prefers-reduced-motion: reduce) | .site-form.editor-skin .actions button:hover | transform | none |

**`响应式`**

## 全局

*表规则 = > 规则*
*表响应式 = > 响应式*

*css规则 = > 网页.样式装配 名="规则" 表=`表规则`*
*css响应式 = > 网页.样式装配 名="响应式" 表=`表响应式`*

`css段` =

| css |
|-----|
| `css规则` |
| `css响应式` |

*css = > text.str_join xs=`css段` sep=""*
**css**
