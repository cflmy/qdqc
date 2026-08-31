---
title: styles/theme
description: 求道量子主题：黑白双色（亮色白/暗色黑），样式即数据表格，装配即函数。
import 网页:ext/web/网页.mq.md
import text:lib/text.mq.md
---

求道量子的主题样式即数据表格：每个 `## 段` 导出一张 GFM 样式表（`|选择器|属性|值|`，
或用 `|媒体|选择器|属性|值|` 表达响应式），`## 全局` 用 `样式装配` 函数把它们
装配成一份完整 CSS。黑白双色：`:root` 是白色亮色盘，`html[data-theme="dark"]`
切换为黑色暗色盘，切换按钮由 `public/theme.js` 注入顶栏，选择持久化到 localStorage。
黑白是骨，蓝紫是点缀——「求道于量子」的克制科技感。

## 基础

配色与字体变量、页面骨架。`:root` 为白色亮色盘，`html[data-theme="dark"]`
覆盖为黑色暗色盘；正文/代码/链接全部走 `var()`，一套规则黑白通吃。

`基础` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| :root | --bg | #ffffff |
| :root | --bg-2 | #f6f8fc |
| :root | --card | #ffffff |
| :root | --card-2 | #f1f5f9 |
| :root | --code-bg | #0b1020 |
| :root | --line | rgba(15,23,42,.10) |
| :root | --ink | #0f172a |
| :root | --ink-soft | #334155 |
| :root | --muted | #64748b |
| :root | --faint | #94a3b8 |
| :root | --accent | #2563eb |
| :root | --accent-2 | #7c3aed |
| :root | --accent-3 | #0891b2 |
| :root | --glass | rgba(255,255,255,.78) |
| :root | --grid-line | rgba(15,23,42,.045) |
| :root | --glow | 0 10px 30px rgba(15,23,42,.06) |
| :root | --glow-2 | 0 0 0 1px rgba(37,99,235,.12), 0 14px 34px rgba(37,99,235,.10) |
| :root | --danger | #e11d48 |
| :root | color-scheme | light |
| :root | --radius | 14px |
| :root | --serif | "Noto Serif SC", Georgia, "Songti SC", serif |
| :root | --sans | "Noto Sans SC", "IBM Plex Sans", system-ui, -apple-system, sans-serif |
| html[data-theme="dark"] | --bg | #0a0e17 |
| html[data-theme="dark"] | --bg-2 | #10151f |
| html[data-theme="dark"] | --card | #141a26 |
| html[data-theme="dark"] | --card-2 | #1a2130 |
| html[data-theme="dark"] | --code-bg | #04070c |
| html[data-theme="dark"] | --line | rgba(148,197,255,.16) |
| html[data-theme="dark"] | --ink | #ffffff |
| html[data-theme="dark"] | --ink-soft | #f3f6fa |
| html[data-theme="dark"] | --muted | #dde5ef |
| html[data-theme="dark"] | --faint | #c2cdd9 |
| html[data-theme="dark"] | --accent | #5c9dff |
| html[data-theme="dark"] | --accent-2 | #a78bfa |
| html[data-theme="dark"] | --accent-3 | #45e0f5 |
| html[data-theme="dark"] | --danger | #fb7185 |
| html[data-theme="dark"] | color-scheme | dark |
| html[data-theme="dark"] | --glass | rgba(12,17,28,.82) |
| html[data-theme="dark"] | --grid-line | rgba(148,197,255,.06) |
| html[data-theme="dark"] | --glow | 0 8px 30px rgba(0,0,0,.35) |
| html[data-theme="dark"] | --glow-2 | 0 0 0 1px rgba(92,157,255,.30), 0 14px 34px rgba(92,157,255,.16) |
| html | scroll-behavior | smooth |
| html | scrollbar-color | var(--faint) transparent |
| * | box-sizing | border-box |
| ::selection | background | rgba(37,99,235,.18) |
| html[data-theme="dark"] ::selection | background | rgba(92,157,255,.30) |
| body | margin | 0 |
| body | font-family | var(--sans) |
| body | background-color | var(--bg) |
| body | background-image | linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px), radial-gradient(1100px 560px at 16% -8%, rgba(37,99,235,.07), transparent 60%), radial-gradient(900px 520px at 92% 112%, rgba(124,58,237,.07), transparent 60%) |
| body | background-size | 34px 34px, 34px 34px, auto, auto |
| body | background-attachment | fixed |
| html[data-theme="dark"] body | background-image | linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px), radial-gradient(1100px 560px at 16% -8%, rgba(92,157,255,.10), transparent 60%), radial-gradient(900px 520px at 92% 112%, rgba(167,139,250,.08), transparent 60%) |
| body | color | var(--ink) |
| body | display | grid |
| body | min-height | 100vh |
| body | line-height | 1.75 |
| body | -webkit-font-smoothing | antialiased |
| body | grid-template-rows | auto 1fr auto |
| body.has-sidebar | grid-template-columns | 16rem 1fr |
| body.has-sidebar | grid-template-areas | "top top" "side main" "foot foot" |
| body.no-sidebar | grid-template-areas | "top" "main" "foot" |
| a | color | var(--accent-3) |
| a | text-decoration | none |
| a:hover | color | var(--accent) |
| a:focus-visible | outline | 2px solid var(--accent) |
| a:focus-visible | outline-offset | 3px |
| code | font-family | "Cascadia Code", "JetBrains Mono", Consolas, monospace |

**`基础`**

## 顶栏

吸顶导航：黑白玻璃磨砂、细分隔线、站名渐变字、黑白主题切换按钮。

`顶栏` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| header.topnav | grid-area | top |
| header.topnav | position | sticky |
| header.topnav | top | 0 |
| header.topnav | z-index | 20 |
| header.topnav | background | var(--glass) |
| header.topnav | backdrop-filter | blur(16px) saturate(1.5) |
| header.topnav | -webkit-backdrop-filter | blur(16px) saturate(1.5) |
| header.topnav | border-bottom | 1px solid var(--line) |
| header.topnav | box-shadow | 0 1px 0 rgba(37,99,235,.06), var(--glow) |
| header.topnav | padding | .9rem 2rem |
| header.topnav | display | flex |
| header.topnav | align-items | center |
| header.topnav | justify-content | space-between |
| header.topnav | gap | .5rem |
| ul.nav | list-style | none |
| ul.nav | margin | 0 |
| ul.nav | padding | 0 |
| ul.nav | display | flex |
| ul.nav | align-items | center |
| ul.nav | gap | .35rem |
| ul.nav li | margin | 0 |
| ul.nav a | display | inline-block |
| ul.nav a | padding | .5rem .95rem |
| ul.nav a | border-radius | 999px |
| ul.nav a | color | var(--muted) |
| ul.nav a | font-size | .95rem |
| ul.nav a | transition | color .16s ease, background-color .16s ease, box-shadow .16s ease |
| ul.nav a:hover | color | var(--ink) |
| ul.nav a:hover | background | color-mix(in srgb, var(--accent) 12%, transparent) |
| ul.nav li:first-child a | font-weight | 800 |
| ul.nav li:first-child a | font-size | 1.14rem |
| ul.nav li:first-child a | letter-spacing | .08em |
| ul.nav li:first-child a | color | transparent |
| ul.nav li:first-child a | background-image | linear-gradient(90deg, var(--accent), var(--accent-2)) |
| ul.nav li:first-child a | background-clip | text |
| ul.nav li:first-child a | -webkit-background-clip | text |
| button.theme-toggle | padding | .42rem 1rem |
| button.theme-toggle | border | 1px solid var(--line) |
| button.theme-toggle | border-radius | 999px |
| button.theme-toggle | background | transparent |
| button.theme-toggle | color | var(--muted) |
| button.theme-toggle | font | inherit |
| button.theme-toggle | font-size | .88rem |
| button.theme-toggle | cursor | pointer |
| button.theme-toggle | transition | color .16s ease, border-color .16s ease, box-shadow .16s ease |
| button.theme-toggle:hover | color | var(--ink) |
| button.theme-toggle:hover | border-color | var(--accent) |
| button.theme-toggle:hover | box-shadow | 0 0 0 1px var(--accent) |

**`顶栏`**

## 侧栏

右侧归档面板：黑白卡片、墨色/荧光左侧条、标题点缀。

`侧栏` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| aside.side | grid-area | side |
| aside.side | margin | 1.5rem 0 1.5rem 1.5rem |
| aside.side | padding | 1.3rem 1.15rem |
| aside.side | background | color-mix(in srgb, var(--card) 88%, transparent) |
| aside.side | border | 1px solid var(--line) |
| aside.side | border-left | 3px solid var(--accent) |
| aside.side | border-radius | var(--radius) |
| aside.side | align-self | start |
| aside.side | box-shadow | var(--glow) |
| aside.side .side-label | display | block |
| aside.side .side-label | font-size | .72rem |
| aside.side .side-label | text-transform | uppercase |
| aside.side .side-label | letter-spacing | .16em |
| aside.side .side-label | color | var(--faint) |
| aside.side .side-label | margin-bottom | .7rem |
| ul.side-nav | list-style | none |
| ul.side-nav | margin | 0 |
| ul.side-nav | padding | 0 |
| ul.side-nav | display | grid |
| ul.side-nav | gap | .3rem |
| ul.side-nav a | display | block |
| ul.side-nav a | padding | .5rem .7rem |
| ul.side-nav a | border-radius | 8px |
| ul.side-nav a | color | var(--muted) |
| ul.side-nav a | transition | color .16s ease, background-color .16s ease |
| ul.side-nav a:hover | color | var(--ink) |
| ul.side-nav a:hover | background | color-mix(in srgb, var(--accent) 10%, transparent) |

**`侧栏`**

## 主体

主内容区：引言大字标题、柔光排版、品牌图光晕。

`主体` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| main.main | grid-area | main |
| main.main | padding | 1.5rem 2rem 3rem |
| main.main | min-width | 0 |
| main.main h1 | font-family | var(--serif) |
| main.main h1 | margin | 0 0 .6rem |
| main.main p | margin | .45rem 0 |
| .main-intro | margin-bottom | 1.8rem |
| .main-intro h1 | font-size | clamp(2rem, 4vw, 3rem) |
| .main-intro h1 | font-weight | 800 |
| .main-intro h1 | letter-spacing | .01em |
| .main-intro h1 | text-wrap | balance |
| .main-intro h1 | color | var(--ink) |
| .main-intro h1 | border-left | 4px solid var(--accent) |
| .main-intro h1 | padding-left | .7rem |
| .main-intro p | color | var(--muted) |
| .main-intro p | max-width | 46rem |
| .main-intro h2 | font-size | 1.3rem |
| .main-intro h2 | color | var(--ink-soft) |
| .main-intro h2 | margin | 1.6rem 0 .6rem |
| .mq-img.brand-logo | margin | 0 |
| .mq-img.brand-logo img | display | block |
| .mq-img.brand-logo img | width | 5.25rem |
| .mq-img.brand-logo img | height | auto |
| .mq-img.brand-logo img | margin | .6rem 0 1.5rem |
| .mq-img.brand-logo img | filter | drop-shadow(0 0 22px color-mix(in srgb, var(--accent) 30%, transparent)) |

**`主体`**

## 卡片

文章/主题列表卡片：黑白玻璃、悬浮上浮、渐变标签、三行摘要。

`卡片` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .content.cards | display | grid |
| .content.cards | grid-template-columns | repeat(auto-fill, minmax(20rem, 1fr)) |
| .content.cards | gap | 1.15rem |
| .content.cards .card | position | relative |
| .content.cards .card | display | block |
| .content.cards .card | background | linear-gradient(160deg, var(--card), var(--card-2)) |
| .content.cards .card | border | 1px solid var(--line) |
| .content.cards .card | border-radius | var(--radius) |
| .content.cards .card | padding | 1.35rem 1.4rem |
| .content.cards .card | box-shadow | var(--glow) |
| .content.cards .card | transition | transform .18s ease, box-shadow .18s ease, border-color .18s ease |
| .content.cards .card:hover | transform | translateY(-5px) |
| .content.cards .card:hover | border-color | var(--accent) |
| .content.cards .card:hover | box-shadow | var(--glow-2) |
| .content.cards a.card-link | color | inherit |
| .content.cards a.card-link:hover | color | inherit |
| .content.cards .card-meta | font-size | .78rem |
| .content.cards .card-meta | color | var(--faint) |
| .content.cards .card-meta | letter-spacing | .04em |
| .content.cards .card h2 | margin | .45rem 0 .5rem |
| .content.cards .card h2 | font-family | var(--serif) |
| .content.cards .card h2 | font-size | 1.24rem |
| .content.cards .card h2 | color | var(--ink) |
| .content.cards .card-tag | display | inline-block |
| .content.cards .card-tag | margin-bottom | .7rem |
| .content.cards .card-tag | padding | .16rem .7rem |
| .content.cards .card-tag | font-size | .76rem |
| .content.cards .card-tag | border-radius | 999px |
| .content.cards .card-tag | color | var(--accent) |
| .content.cards .card-tag | background | color-mix(in srgb, var(--accent) 9%, transparent) |
| .content.cards .card-tag | border | 1px solid color-mix(in srgb, var(--accent) 30%, transparent) |
| .content.cards .card p | margin | 0 |
| .content.cards .card p | color | var(--muted) |
| .content.cards .card p | font-size | .92rem |
| .content.cards .card p | display | -webkit-box |
| .content.cards .card p | -webkit-line-clamp | 3 |
| .content.cards .card p | -webkit-box-orient | vertical |
| .content.cards .card p | overflow | hidden |

**`卡片`**

## 文章

详情页正文排版：黑白排版、引用留墨边、代码深底。

`文章` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .article | max-width | 46rem |
| .article | background | linear-gradient(160deg, var(--card), var(--card-2)) |
| .article | border | 1px solid var(--line) |
| .article | border-radius | var(--radius) |
| .article | padding | 2rem 2.1rem |
| .article-title | margin | .4rem 0 .5rem |
| .article-title | font-family | var(--serif) |
| .article-title | font-size | clamp(1.6rem, 3vw, 2.2rem) |
| .article-title | color | var(--ink) |
| .article-meta | font-size | .8rem |
| .article-meta | color | var(--faint) |
| .article-tags | display | inline-block |
| .article-tags | margin-top | .3rem |
| .article-tags | padding | .2rem .8rem |
| .article-tags | font-size | .8rem |
| .article-tags | border-radius | 999px |
| .article-tags | color | var(--accent-2) |
| .article-tags | background | color-mix(in srgb, var(--accent-2) 9%, transparent) |
| .article h2 | margin | 1.9rem 0 .7rem |
| .article h2 | font-family | var(--serif) |
| .article h2 | color | var(--ink) |
| .article h2 | border-left | 3px solid var(--accent) |
| .article h2 | padding-left | .6rem |
| .article h3 | margin | 1.5rem 0 .6rem |
| .article h3 | color | var(--ink-soft) |
| .article p | color | var(--ink-soft) |
| .article blockquote | margin | 1.1rem 0 |
| .article blockquote | padding | .7rem 1.1rem |
| .article blockquote | border-left | 3px solid var(--accent-2) |
| .article blockquote | background | color-mix(in srgb, var(--accent-2) 6%, transparent) |
| .article blockquote | color | var(--muted) |
| .article .article-body.md pre | padding | .9rem 1.1rem |
| .article .article-body.md pre | border-radius | 10px |
| .article .article-body.md pre | background | var(--code-bg) |
| .article .article-body.md pre | border | 1px solid var(--line) |
| .article .article-body.md pre | overflow-x | auto |
| .article .article-body.md code | color | var(--accent-3) |
| .article .article-body.md pre code | color | #bfd9f5 |
| .article ul | padding-left | 1.3rem |
| .article ul | color | var(--ink-soft) |
| .article hr | border | 0 |
| .article hr | height | 1px |
| .article hr | background | var(--line) |
| .article hr | margin | 2rem 0 |

**`文章`**

## 表单

发帖等表单：黑白输入框、聚焦墨环/荧光环、渐变提交按钮。

`表单` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .site-form | max-width | 30rem |
| .site-form form | display | grid |
| .site-form form | gap | 1rem |
| .site-form label | display | grid |
| .site-form label | gap | .35rem |
| .site-form label | font-size | .9rem |
| .site-form label | color | var(--muted) |
| .site-form input | padding | .6rem .8rem |
| .site-form input | border | 1px solid var(--line) |
| .site-form input | border-radius | 8px |
| .site-form input | background | var(--card) |
| .site-form input | color | var(--ink) |
| .site-form input | font | inherit |
| .site-form input:focus | outline | none |
| .site-form input:focus | border-color | var(--accent) |
| .site-form input:focus | box-shadow | 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent) |
| .site-form textarea | padding | .6rem .8rem |
| .site-form textarea | border | 1px solid var(--line) |
| .site-form textarea | border-radius | 8px |
| .site-form textarea | background | var(--card) |
| .site-form textarea | color | var(--ink) |
| .site-form textarea | font | inherit |
| .site-form textarea | min-height | 8rem |
| .site-form textarea:focus | outline | none |
| .site-form textarea:focus | border-color | var(--accent) |
| .site-form textarea:focus | box-shadow | 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent) |
| .site-form input[readonly] | background | var(--bg-2) |
| .site-form input[readonly] | color | var(--faint) |
| .site-form .err | color | var(--danger) |
| .site-form .err | font-size | .82rem |
| .site-form .actions | display | flex |
| .site-form .actions | gap | .8rem |
| .site-form .actions | align-items | center |
| .site-form .actions | flex-wrap | wrap |
| .site-form button | padding | .6rem 1.4rem |
| .site-form button | border | 0 |
| .site-form button | border-radius | 999px |
| .site-form button | background-image | linear-gradient(90deg, var(--accent), var(--accent-2)) |
| .site-form button | color | #fff |
| .site-form button | font-weight | 600 |
| .site-form button | font-family | inherit |
| .site-form button | cursor | pointer |
| .site-form button:hover | filter | brightness(1.08) |
| .site-form button:hover | box-shadow | var(--glow-2) |
| .site-form .actions a | color | var(--faint) |
| .site-form .meta | color | var(--faint) |
| .site-form .meta | font-size | .82rem |

**`表单`**

## 页脚

站点页脚：黑白、细分割线、柔和文字。

`页脚` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| footer.foot | grid-area | foot |
| footer.foot | margin-top | 2rem |
| footer.foot | padding | 1.1rem 2rem |
| footer.foot | background | color-mix(in srgb, var(--card) 70%, transparent) |
| footer.foot | border-top | 1px solid var(--line) |
| ul.foot-nav | list-style | none |
| ul.foot-nav | margin | 0 |
| ul.foot-nav | padding | 0 |
| ul.foot-nav | display | flex |
| ul.foot-nav | align-items | center |
| ul.foot-nav | gap | 1.4rem |
| ul.foot-nav a | color | var(--faint) |
| ul.foot-nav a | font-size | .86rem |
| ul.foot-nav a:hover | color | var(--accent-3) |
| ul.foot-nav li:first-child a | color | var(--muted) |

**`页脚`**

## 分页

分页控件：黑白胶囊、荧光边框悬停。

`分页` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .pagination | display | flex |
| .pagination | align-items | center |
| .pagination | gap | 1rem |
| .pagination | margin-top | 2rem |
| .pagination | flex-wrap | wrap |
| .pagination a | padding | .45rem 1.1rem |
| .pagination a | border-radius | 999px |
| .pagination a | border | 1px solid var(--line) |
| .pagination a | color | var(--muted) |
| .pagination a | transition | color .16s ease, border-color .16s ease, box-shadow .16s ease |
| .pagination a:hover | color | var(--ink) |
| .pagination a:hover | border-color | var(--accent) |
| .pagination a:hover | box-shadow | 0 0 0 1px var(--accent) |
| .pagination .page-status | color | var(--faint) |
| .pagination .page-status | font-size | .88rem |

**`分页`**

## 响应式

窄屏布局：单列、顶栏换行、卡片单列。

`响应式` =

| 媒体 | 选择器 | 属性 | 值 |
|------|--------|------|-----|
| (max-width: 860px) | body.has-sidebar | grid-template-columns | 1fr |
| (max-width: 860px) | body.has-sidebar | grid-template-areas | "top" "main" "foot" |
| (max-width: 860px) | aside.side | display | none |
| (max-width: 860px) | main.main | padding | 1.2rem 1rem 2.5rem |
| (max-width: 860px) | header.topnav | padding | .8rem 1rem |
| (max-width: 860px) | .content.cards | grid-template-columns | 1fr |
| (max-width: 560px) | ul.nav | flex-wrap | wrap |
| (max-width: 560px) | .article | padding | 1.3rem 1.1rem |
| (prefers-reduced-motion: reduce) | * | transition | none |
| (prefers-reduced-motion: reduce) | * | animation | none |
| (prefers-reduced-motion: reduce) | html | scroll-behavior | auto |

**`响应式`**

## 全局

用 样式装配 函数逐个把段落表装配成 CSS，再拼接成完整样式表。

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