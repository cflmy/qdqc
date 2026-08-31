---
title: styles/theme
description: 求道量子 · 科技杂志刊 + 论文阅读栏主题。
import 网页:ext/web/网页.mq.md
import text:lib/text.mq.md
---

求道量子主题参考科技杂志 / 期刊排版：刊头 masthead、等宽栏目标签、目录式编号列表，
文章页接近论文阅读栏（发丝线标题区、首字下沉、章节编号、宽边距）。动效由
public/brand-motion.css 与 theme.js 协作完成。禁止在本文件顶层使用无序列表符号。

## 基础

`基础` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| :root | --bg | #f3f1ea |
| :root | --bg-2 | #e8e4da |
| :root | --card | #faf8f3 |
| :root | --card-2 | #efebe3 |
| :root | --code-bg | #12161e |
| :root | --line | rgba(24, 22, 18, .14) |
| :root | --ink | #14120f |
| :root | --ink-soft | #2e2a24 |
| :root | --muted | #5c564c |
| :root | --faint | #8a8378 |
| :root | --accent | #0f6e6a |
| :root | --accent-2 | #0b5552 |
| :root | --accent-3 | #17807b |
| :root | --mark | #c45c26 |
| :root | --glass | rgba(243, 241, 234, .9) |
| :root | --radius | 0px |
| :root | --measure | 40rem |
| :root | --serif | Georgia, "Songti SC", "Noto Serif SC", "Source Han Serif SC", serif |
| :root | --sans | system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif |
| :root | --mono | ui-monospace, "Cascadia Code", "Consolas", "Sarasa Mono SC", monospace |
| :root | color-scheme | light |
| html[data-theme="dark"] | --bg | #0c0f14 |
| html[data-theme="dark"] | --bg-2 | #141922 |
| html[data-theme="dark"] | --card | #12171f |
| html[data-theme="dark"] | --card-2 | #1a202a |
| html[data-theme="dark"] | --code-bg | #07090d |
| html[data-theme="dark"] | --line | rgba(210, 220, 235, .12) |
| html[data-theme="dark"] | --ink | #e9eef5 |
| html[data-theme="dark"] | --ink-soft | #c5ced9 |
| html[data-theme="dark"] | --muted | #8b97a8 |
| html[data-theme="dark"] | --faint | #5f6b7a |
| html[data-theme="dark"] | --accent | #3dcdc4 |
| html[data-theme="dark"] | --accent-2 | #7ee0d9 |
| html[data-theme="dark"] | --accent-3 | #a8efe9 |
| html[data-theme="dark"] | --mark | #e8a445 |
| html[data-theme="dark"] | --glass | rgba(12, 15, 20, .92) |
| html[data-theme="dark"] | color-scheme | dark |
| html | scroll-behavior | smooth |
| * | box-sizing | border-box |
| ::selection | background | color-mix(in srgb, var(--mark) 28%, transparent) |
| body | margin | 0 |
| body | font-family | var(--sans) |
| body | font-size | clamp(1rem, 0.95rem + 0.22vw, 1.075rem) |
| body | background-color | var(--bg) |
| body | background-image | linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px) |
| body | background-size | 48px 48px |
| body | color | var(--ink) |
| body | display | grid |
| body | min-height | 100vh |
| body | line-height | 1.75 |
| body | -webkit-font-smoothing | antialiased |
| body | grid-template-rows | auto 1fr auto |
| body.has-sidebar | grid-template-columns | minmax(10.5rem, 12.5rem) minmax(0, 1fr) |
| body.has-sidebar | grid-template-areas | "top top" "side main" "foot foot" |
| body.no-sidebar | grid-template-areas | "top" "main" "foot" |
| a | color | var(--accent-2) |
| a | text-decoration | none |
| a:hover | color | var(--mark) |
| a:focus-visible | outline | 2px solid var(--accent) |
| a:focus-visible | outline-offset | 3px |
| code | font-family | var(--mono) |
| code | font-size | .88em |
| #qd-progress | position | fixed |
| #qd-progress | top | 0 |
| #qd-progress | left | 0 |
| #qd-progress | height | 2px |
| #qd-progress | width | 0 |
| #qd-progress | z-index | 60 |
| #qd-progress | background | linear-gradient(90deg, var(--accent), var(--mark)) |
| #qd-progress | transform-origin | left center |
| #qd-progress | pointer-events | none |

**`基础`**

## 顶栏

`顶栏` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| header.topnav | grid-area | top |
| header.topnav | position | sticky |
| header.topnav | top | 0 |
| header.topnav | z-index | 30 |
| header.topnav | background | var(--glass) |
| header.topnav | backdrop-filter | blur(12px) |
| header.topnav | -webkit-backdrop-filter | blur(12px) |
| header.topnav | border-bottom | 1px solid var(--line) |
| header.topnav | padding | .85rem clamp(1rem, 4vw, 2.75rem) |
| header.topnav | display | flex |
| header.topnav | align-items | center |
| header.topnav | justify-content | space-between |
| header.topnav | gap | 1rem |
| ul.nav | list-style | none |
| ul.nav | margin | 0 |
| ul.nav | padding | 0 |
| ul.nav | display | flex |
| ul.nav | align-items | baseline |
| ul.nav | gap | .2rem 1.35rem |
| ul.nav | flex-wrap | wrap |
| ul.nav li | margin | 0 |
| ul.nav a | position | relative |
| ul.nav a | display | inline-block |
| ul.nav a | padding | .25rem 0 |
| ul.nav a | color | var(--muted) |
| ul.nav a | font-size | .88rem |
| ul.nav a | letter-spacing | .04em |
| ul.nav a | transition | color .2s ease |
| ul.nav a:hover | color | var(--ink) |
| ul.nav a:hover | background | transparent |
| ul.nav li:first-child a | font-family | var(--serif) |
| ul.nav li:first-child a | font-weight | 700 |
| ul.nav li:first-child a | font-size | 1.08rem |
| ul.nav li:first-child a | letter-spacing | .16em |
| ul.nav li:first-child a | color | var(--ink) |
| ul.nav li:first-child a:hover | color | var(--accent-2) |
| button.theme-toggle | padding | .28rem .65rem |
| button.theme-toggle | border | 1px solid var(--line) |
| button.theme-toggle | border-radius | 0 |
| button.theme-toggle | background | transparent |
| button.theme-toggle | color | var(--faint) |
| button.theme-toggle | font-family | var(--mono) |
| button.theme-toggle | font-size | .68rem |
| button.theme-toggle | letter-spacing | .12em |
| button.theme-toggle | text-transform | uppercase |
| button.theme-toggle | cursor | pointer |
| button.theme-toggle | transition | color .2s ease, border-color .2s ease, background-color .2s ease |
| button.theme-toggle:hover | color | var(--ink) |
| button.theme-toggle:hover | border-color | var(--ink) |

**`顶栏`**

## 侧栏

`侧栏` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| aside.side | grid-area | side |
| aside.side | margin | 2.25rem 0 2rem 1.25rem |
| aside.side | padding | 0 1rem 0 0 |
| aside.side | border-right | 1px solid var(--line) |
| aside.side | background | transparent |
| aside.side | align-self | start |
| aside.side | position | sticky |
| aside.side | top | 4.25rem |
| aside.side .side-label | display | block |
| aside.side .side-label | font-family | var(--mono) |
| aside.side .side-label | font-size | .66rem |
| aside.side .side-label | letter-spacing | .18em |
| aside.side .side-label | text-transform | uppercase |
| aside.side .side-label | color | var(--mark) |
| aside.side .side-label | margin-bottom | .9rem |
| ul.side-nav | list-style | none |
| ul.side-nav | margin | 0 |
| ul.side-nav | padding | 0 |
| ul.side-nav | display | grid |
| ul.side-nav | gap | .1rem |
| ul.side-nav a | display | block |
| ul.side-nav a | padding | .42rem 0 |
| ul.side-nav a | color | var(--muted) |
| ul.side-nav a | font-size | .88rem |
| ul.side-nav a | transition | color .2s ease, transform .2s ease |
| ul.side-nav a:hover | color | var(--ink) |
| ul.side-nav a:hover | transform | translateX(3px) |
| ul.side-nav a:hover | background | transparent |

**`侧栏`**

## 主体

刊头区：等宽 kicker、大标题、副文发丝底线。

`主体` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| main.main | grid-area | main |
| main.main | padding | clamp(1.6rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem) 4.5rem |
| main.main | min-width | 0 |
| main.main | max-width | 54rem |
| main.main h1 | font-family | var(--serif) |
| main.main h1 | margin | 0 0 .7rem |
| main.main p | margin | .45rem 0 |
| .main-intro | margin-bottom | 2.5rem |
| .main-intro | max-width | 44rem |
| .main-intro | padding-bottom | 1.85rem |
| .main-intro | border-bottom | 0 |
| .main-intro .kicker | margin | 0 0 .7rem |
| .main-intro .kicker | font-family | var(--mono) |
| .main-intro .kicker | font-size | .72rem |
| .main-intro .kicker | letter-spacing | .2em |
| .main-intro .kicker | text-transform | uppercase |
| .main-intro .kicker | color | var(--mark) |
| .main-intro h1 | font-size | clamp(2.4rem, 6vw, 3.6rem) |
| .main-intro h1 | font-weight | 700 |
| .main-intro h1 | letter-spacing | .01em |
| .main-intro h1 | line-height | 1.12 |
| .main-intro h1 | text-wrap | balance |
| .main-intro h1 | color | var(--ink) |
| .main-intro p.lede | font-size | clamp(1.05rem, 1.8vw, 1.25rem) |
| .main-intro p.lede | line-height | 1.7 |
| .main-intro p.lede | color | var(--ink-soft) |
| .main-intro p.lede | max-width | 34rem |
| .main-intro p.lede | margin-top | .75rem |
| .main-intro p | color | var(--muted) |
| .main-intro p | max-width | 36rem |
| .mq-img.brand-logo | margin | 0 |
| .mq-img.brand-logo img | display | block |
| .mq-img.brand-logo img | width | 5.75rem |
| .mq-img.brand-logo img | height | auto |
| .mq-img.brand-logo img | margin | 0 0 1.35rem |
| .mq-img.brand-logo img | border | 1px solid var(--line) |
| .mq-img.brand-logo img | border-radius | 0 |
| .mq-img.brand-logo img | filter | none |

**`主体`**

## 卡片

杂志目录：编号 + 发丝分割 + 悬停平移。

`卡片` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .content.cards | display | grid |
| .content.cards | grid-template-columns | 1fr |
| .content.cards | gap | 0 |
| .content.cards | max-width | var(--measure) |
| .content.cards | counter-reset | qd-article |
| .content.cards .card | position | relative |
| .content.cards .card | display | grid |
| .content.cards .card | grid-template-columns | 3.2rem 1fr |
| .content.cards .card | column-gap | 1rem |
| .content.cards .card | align-items | start |
| .content.cards .card | background | transparent |
| .content.cards .card | border | 0 |
| .content.cards .card | border-bottom | 1px solid var(--line) |
| .content.cards .card | border-radius | 0 |
| .content.cards .card | padding | 1.45rem 0 1.5rem |
| .content.cards .card | box-shadow | none |
| .content.cards .card | transition | background-color .25s ease |
| .content.cards .card::before | counter-increment | qd-article |
| .content.cards .card::before | content | counter(qd-article, decimal-leading-zero) |
| .content.cards .card::before | font-family | var(--mono) |
| .content.cards .card::before | font-size | .78rem |
| .content.cards .card::before | letter-spacing | .08em |
| .content.cards .card::before | color | var(--faint) |
| .content.cards .card::before | padding-top | .35rem |
| .content.cards .card:hover | background | transparent |
| .content.cards .card:hover | transform | none |
| .content.cards .card:hover::before | color | var(--mark) |
| .content.cards a.card-link | grid-column | 2 |
| .content.cards a.card-link | color | inherit |
| .content.cards a.card-link | text-decoration | none |
| .content.cards a.card-link | display | block |
| .content.cards a.card-link | transition | transform .35s cubic-bezier(0.22, 1, 0.36, 1) |
| .content.cards .card:hover a.card-link | transform | translateX(6px) |
| .content.cards .card-meta | font-family | var(--mono) |
| .content.cards .card-meta | font-size | .68rem |
| .content.cards .card-meta | color | var(--faint) |
| .content.cards .card-meta | letter-spacing | .12em |
| .content.cards .card-meta | text-transform | uppercase |
| .content.cards .card h2 | margin | .35rem 0 .45rem |
| .content.cards .card h2 | font-family | var(--serif) |
| .content.cards .card h2 | font-size | clamp(1.22rem, 2.2vw, 1.55rem) |
| .content.cards .card h2 | font-weight | 700 |
| .content.cards .card h2 | line-height | 1.32 |
| .content.cards .card h2 | color | var(--ink) |
| .content.cards .card:hover h2 | color | var(--accent-2) |
| .content.cards .card-tag | display | inline-block |
| .content.cards .card-tag | margin | 0 .5rem .3rem 0 |
| .content.cards .card-tag | padding | 0 |
| .content.cards .card-tag | font-family | var(--mono) |
| .content.cards .card-tag | font-size | .66rem |
| .content.cards .card-tag | letter-spacing | .14em |
| .content.cards .card-tag | text-transform | uppercase |
| .content.cards .card-tag | color | var(--mark) |
| .content.cards .card-tag | background | transparent |
| .content.cards .card-tag | border | 0 |
| .content.cards .card p | margin | 0 |
| .content.cards .card p | color | var(--muted) |
| .content.cards .card p | font-size | .94rem |
| .content.cards .card p | line-height | 1.65 |
| .content.cards .card p | max-width | 36rem |
| .content.cards .card p | display | -webkit-box |
| .content.cards .card p | -webkit-line-clamp | 2 |
| .content.cards .card p | -webkit-box-orient | vertical |
| .content.cards .card p | overflow | hidden |

**`卡片`**

## 文章

论文 / 科技刊阅读栏：标题区发丝线、首字下沉、章节编号。

`文章` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .article | max-width | var(--measure) |
| .article | background | transparent |
| .article | border | 0 |
| .article | padding | 0 0 3rem |
| .article | box-shadow | none |
| .article-meta | font-family | var(--mono) |
| .article-meta | font-size | .7rem |
| .article-meta | color | var(--faint) |
| .article-meta | letter-spacing | .14em |
| .article-meta | text-transform | uppercase |
| .article-title | margin | .85rem 0 .8rem |
| .article-title | font-family | var(--serif) |
| .article-title | font-size | clamp(1.85rem, 4.2vw, 2.75rem) |
| .article-title | font-weight | 700 |
| .article-title | line-height | 1.2 |
| .article-title | letter-spacing | .005em |
| .article-title | color | var(--ink) |
| .article-title | text-wrap | balance |
| .article-tags | display | inline-block |
| .article-tags | margin | .2rem 0 1.6rem |
| .article-tags | padding | 0 0 .95rem |
| .article-tags | width | 100% |
| .article-tags | border-bottom | 1px solid var(--line) |
| .article-tags | font-family | var(--mono) |
| .article-tags | font-size | .7rem |
| .article-tags | letter-spacing | .14em |
| .article-tags | text-transform | uppercase |
| .article-tags | color | var(--mark) |
| .article-tags | background | transparent |
| .article-tags | border-radius | 0 |
| .article .article-body.md | counter-reset | qd-sec |
| .article .article-body.md | padding-top | .35rem |
| .article .article-body.md > p:first-of-type::first-letter | float | left |
| .article .article-body.md > p:first-of-type::first-letter | font-family | var(--serif) |
| .article .article-body.md > p:first-of-type::first-letter | font-size | 3.4rem |
| .article .article-body.md > p:first-of-type::first-letter | font-weight | 700 |
| .article .article-body.md > p:first-of-type::first-letter | line-height | .82 |
| .article .article-body.md > p:first-of-type::first-letter | padding | .12rem .45rem .05rem 0 |
| .article .article-body.md > p:first-of-type::first-letter | color | var(--accent) |
| .article h2 | margin | 2.4rem 0 .8rem |
| .article h2 | font-family | var(--serif) |
| .article h2 | font-size | clamp(1.2rem, 2vw, 1.4rem) |
| .article h2 | color | var(--ink) |
| .article h2 | display | flex |
| .article h2 | gap | .75rem |
| .article h2 | align-items | baseline |
| .article h2::before | counter-increment | qd-sec |
| .article h2::before | content | counter(qd-sec, decimal-leading-zero) |
| .article h2::before | font-family | var(--mono) |
| .article h2::before | font-size | .72rem |
| .article h2::before | letter-spacing | .1em |
| .article h2::before | color | var(--mark) |
| .article h2 | border-left | 0 |
| .article h2 | padding-left | 0 |
| .article h3 | margin | 1.7rem 0 .55rem |
| .article h3 | font-family | var(--serif) |
| .article h3 | font-size | 1.08rem |
| .article h3 | color | var(--ink-soft) |
| .article p | color | var(--ink-soft) |
| .article p | margin | .9rem 0 |
| .article p | max-width | 38rem |
| .article blockquote | margin | 1.7rem 0 |
| .article blockquote | padding | .2rem 0 .2rem 1.15rem |
| .article blockquote | border-left | 2px solid var(--mark) |
| .article blockquote | background | transparent |
| .article blockquote | color | var(--muted) |
| .article blockquote | font-family | var(--serif) |
| .article blockquote | font-size | 1.08rem |
| .article blockquote | font-style | italic |
| .article .article-body.md pre | padding | 1rem 1.15rem |
| .article .article-body.md pre | border-radius | 0 |
| .article .article-body.md pre | background | var(--code-bg) |
| .article .article-body.md pre | border | 1px solid var(--line) |
| .article .article-body.md pre | overflow-x | auto |
| .article .article-body.md code | color | var(--accent-3) |
| .article .article-body.md pre code | color | #b8e4de |
| .article ul | padding-left | 1.2rem |
| .article ul | color | var(--ink-soft) |
| .article hr | border | 0 |
| .article hr | height | 1px |
| .article hr | background | var(--line) |
| .article hr | margin | 2.4rem 0 |

**`文章`**

## 表单

`表单` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .site-form | max-width | 30rem |
| .site-form form | display | grid |
| .site-form form | gap | 1rem |
| .site-form label | display | grid |
| .site-form label | gap | .35rem |
| .site-form label | font-size | .85rem |
| .site-form label | color | var(--muted) |
| .site-form input | padding | .6rem .75rem |
| .site-form input | border | 1px solid var(--line) |
| .site-form input | border-radius | 0 |
| .site-form input | background | var(--card) |
| .site-form input | color | var(--ink) |
| .site-form input | font | inherit |
| .site-form input:focus | outline | none |
| .site-form input:focus | border-color | var(--accent) |
| .site-form textarea | padding | .6rem .75rem |
| .site-form textarea | border | 1px solid var(--line) |
| .site-form textarea | border-radius | 0 |
| .site-form textarea | background | var(--card) |
| .site-form textarea | color | var(--ink) |
| .site-form textarea | font | inherit |
| .site-form textarea | min-height | 8rem |
| .site-form textarea:focus | outline | none |
| .site-form textarea:focus | border-color | var(--accent) |
| .site-form input[readonly] | background | var(--bg-2) |
| .site-form input[readonly] | color | var(--faint) |
| .site-form .err | color | var(--danger) |
| .site-form .err | font-size | .82rem |
| .site-form .actions | display | flex |
| .site-form .actions | gap | .8rem |
| .site-form .actions | align-items | center |
| .site-form .actions | flex-wrap | wrap |
| .site-form button | padding | .65rem 1.4rem |
| .site-form button | border | 0 |
| .site-form button | border-radius | 0 |
| .site-form button | background | var(--accent) |
| .site-form button | background-image | none |
| .site-form button | color | #fff |
| .site-form button | font-weight | 600 |
| .site-form button | font-family | inherit |
| .site-form button | cursor | pointer |
| .site-form button:hover | filter | brightness(1.06) |
| .site-form .actions a | color | var(--faint) |
| .site-form .meta | color | var(--faint) |
| .site-form .meta | font-size | .82rem |

**`表单`**

## 页脚

`页脚` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| footer.foot | grid-area | foot |
| footer.foot | padding | 1.4rem clamp(1rem, 4vw, 2.75rem) |
| footer.foot | border-top | 1px solid var(--line) |
| footer.foot | background | transparent |
| ul.foot-nav | list-style | none |
| ul.foot-nav | margin | 0 |
| ul.foot-nav | padding | 0 |
| ul.foot-nav | display | flex |
| ul.foot-nav | gap | 1.2rem |
| ul.foot-nav | flex-wrap | wrap |
| ul.foot-nav | align-items | center |
| ul.foot-nav a | color | var(--faint) |
| ul.foot-nav a | font-size | .8rem |
| ul.foot-nav a | font-family | var(--mono) |
| ul.foot-nav a | letter-spacing | .06em |
| ul.foot-nav a:hover | color | var(--ink) |
| ul.foot-nav li:first-child a | color | var(--muted) |

**`页脚`**

## 分页

`分页` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .pagination | display | flex |
| .pagination | align-items | center |
| .pagination | gap | 1rem |
| .pagination | margin-top | 2.4rem |
| .pagination | padding-top | 1.2rem |
| .pagination | border-top | 1px solid var(--line) |
| .pagination | max-width | var(--measure) |
| .pagination | flex-wrap | wrap |
| .pagination a | color | var(--muted) |
| .pagination a | font-family | var(--mono) |
| .pagination a | font-size | .78rem |
| .pagination a | letter-spacing | .08em |
| .pagination a | text-transform | uppercase |
| .pagination a | border | 0 |
| .pagination a | padding | .2rem 0 |
| .pagination a:hover | color | var(--mark) |
| .pagination a:hover | background | transparent |
| .pagination .page-status | color | var(--faint) |
| .pagination .page-status | font-family | var(--mono) |
| .pagination .page-status | font-size | .75rem |

**`分页`**

## 响应式

`响应式` =

| 媒体 | 选择器 | 属性 | 值 |
|------|--------|------|-----|
| (max-width: 860px) | body.has-sidebar | grid-template-columns | 1fr |
| (max-width: 860px) | body.has-sidebar | grid-template-areas | "top" "main" "foot" |
| (max-width: 860px) | aside.side | display | none |
| (max-width: 860px) | main.main | padding | 1.25rem 1.05rem 3rem |
| (max-width: 860px) | .content.cards .card | grid-template-columns | 2.4rem 1fr |
| (max-width: 860px) | .content.cards .card:hover a.card-link | transform | none |
| (max-width: 560px) | .main-intro h1 | font-size | clamp(2rem, 9vw, 2.6rem) |
| (max-width: 560px) | .article .article-body.md > p:first-of-type::first-letter | font-size | 2.7rem |
| (prefers-reduced-motion: reduce) | * | transition | none |
| (prefers-reduced-motion: reduce) | * | animation | none |
| (prefers-reduced-motion: reduce) | html | scroll-behavior | auto |

**`响应式`**

## 全局

*基础表 = > 基础*
*顶栏表 = > 顶栏*
*侧栏表 = > 侧栏*
*主体表 = > 主体*
*卡片表 = > 卡片*
*文章表 = > 文章*
*表单表 = > 表单*
*页脚表 = > 页脚*
*分页表 = > 分页*
*响应式表 = > 响应式*

*css基础 = > 网页.样式装配 名="基础" 表=`基础表`*
*css顶栏 = > 网页.样式装配 名="顶栏" 表=`顶栏表`*
*css侧栏 = > 网页.样式装配 名="侧栏" 表=`侧栏表`*
*css主体 = > 网页.样式装配 名="主体" 表=`主体表`*
*css卡片 = > 网页.样式装配 名="卡片" 表=`卡片表`*
*css文章 = > 网页.样式装配 名="文章" 表=`文章表`*
*css表单 = > 网页.样式装配 名="表单" 表=`表单表`*
*css页脚 = > 网页.样式装配 名="页脚" 表=`页脚表`*
*css分页 = > 网页.样式装配 名="分页" 表=`分页表`*
*css响应式 = > 网页.样式装配 名="响应式" 表=`响应式表`*

`css段` =

| css |
|-----|
| `css基础` |
| `css顶栏` |
| `css侧栏` |
| `css主体` |
| `css卡片` |
| `css文章` |
| `css表单` |
| `css页脚` |
| `css分页` |
| `css响应式` |

*css = > text.str_join xs=`css段` sep=""*
**css**
