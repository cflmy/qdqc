---
title: styles/brand-motion
description: 刊头与入场动效样式。
import 网页:ext/web/网页.mq.md
import text:lib/text.mq.md
---

由 public/brand-motion.css 迁入的样式表。含 `/` 的值已加引号（Marqdo 0.3.2+）。
禁止在本文件顶层使用无序列表符号。

## 规则

`规则` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| .masthead-lockup | --mark-size | clamp(2.65rem, 7.5vw, 3.2rem) |
| .masthead-lockup | display | flex |
| .masthead-lockup | align-items | flex-start |
| .masthead-lockup | gap | 1rem |
| .masthead-lockup | margin | 0 |
| .masthead-lockup | max-width | 36rem |
| .masthead-lockup .mq-img.brand-logo | flex | 0 0 var(--mark-size) |
| .masthead-lockup .mq-img.brand-logo | width | var(--mark-size) |
| .masthead-lockup .mq-img.brand-logo | margin | 0 |
| .masthead-lockup .mq-img.brand-logo | padding | 0 |
| .masthead-lockup .mq-img.brand-logo | border | 0 |
| .masthead-lockup .mq-img.brand-logo | line-height | 0 |
| .masthead-lockup .mq-img.brand-logo a | display | block |
| .masthead-lockup .mq-img.brand-logo a | line-height | 0 |
| .masthead-lockup .mq-img.brand-logo img | width | var(--mark-size) |
| .masthead-lockup .mq-img.brand-logo img | height | var(--mark-size) |
| .masthead-lockup .mq-img.brand-logo img | object-fit | cover |
| .masthead-lockup .mq-img.brand-logo img | object-position | 50% 38% |
| .masthead-lockup .mq-img.brand-logo img | margin | 0 |
| .masthead-lockup .mq-img.brand-logo img | border | 0 |
| .masthead-lockup .mq-img.brand-logo img | border-radius | 0 |
| .masthead-lockup .mq-img.brand-logo img | box-shadow | none |
| .masthead-lockup .masthead-copy | flex | 1 1 auto |
| .masthead-lockup .masthead-copy | min-width | 0 |
| .masthead-lockup .masthead-copy | padding-top | 0.06em |
| .masthead-lockup .masthead-copy h1 | margin | 0 |
| .masthead-lockup .masthead-copy h1 | font-size | var(--mark-size) |
| .masthead-lockup .masthead-copy h1 | line-height | 1 |
| .masthead-lockup .masthead-copy h1 | letter-spacing | 0.14em |
| .masthead-lockup .masthead-copy h1 | font-weight | 700 |
| .masthead-lockup .masthead-copy .lede | margin | 0.6rem 0 0 |
| .masthead-lockup .masthead-copy .lede | max-width | 22rem |
| main.main:has(> .mq-images .mq-img.brand-logo):has(> .main-intro):not(:has(.masthead-lockup)) > .mq-images | margin | 0 0 0.85rem |
| main.main:has(> .mq-images .mq-img.brand-logo):has(> .main-intro):not(:has(.masthead-lockup)) .mq-img.brand-logo img | width | 3.1rem |
| main.main:has(> .mq-images .mq-img.brand-logo):has(> .main-intro):not(:has(.masthead-lockup)) .mq-img.brand-logo img | height | 3.1rem |
| main.main:has(> .mq-images .mq-img.brand-logo):has(> .main-intro):not(:has(.masthead-lockup)) .mq-img.brand-logo img | object-fit | cover |
| main.main:has(> .mq-images .mq-img.brand-logo):has(> .main-intro):not(:has(.masthead-lockup)) .mq-img.brand-logo img | object-position | 50% 38% |
| main.main:has(> .mq-images .mq-img.brand-logo):has(> .main-intro):not(:has(.masthead-lockup)) .mq-img.brand-logo img | margin | 0 |
| main.main:has(> .mq-images .mq-img.brand-logo):has(> .main-intro):not(:has(.masthead-lockup)) .mq-img.brand-logo img | border | 0 |
| ul.nav a::after | content | "" |
| ul.nav a::after | position | absolute |
| ul.nav a::after | left | 0 |
| ul.nav a::after | bottom | 0 |
| ul.nav a::after | width | 100% |
| ul.nav a::after | height | 1px |
| ul.nav a::after | background | var(--mark, #c45c26) |
| ul.nav a::after | transform | scaleX(0) |
| ul.nav a::after | transform-origin | left |
| ul.nav a::after | transition | transform 0.28s cubic-bezier(0.22, 1, 0.36, 1) |
| ul.nav a:hover::after | transform | scaleX(1) |
| ul.nav li:first-child a::after | background | var(--accent, #0f6e6a) |

**`规则`**

## 动画

`动画` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| @keyframes qd-rise | from | opacity: 0; transform: translateY(18px); filter: blur(5px) |
| @keyframes qd-rise | to | opacity: 1; transform: translateY(0); filter: blur(0) |
| @keyframes qd-masthead | from | opacity: 0; clip-path: inset(0 0 100% 0); transform: translateY(10px) |
| @keyframes qd-masthead | to | opacity: 1; clip-path: inset(0 0 0 0); transform: translateY(0) |
| @keyframes qd-kicker | from | opacity: 0; letter-spacing: 0.4em; transform: translateY(6px) |
| @keyframes qd-kicker | to | opacity: 1; letter-spacing: 0.24em; transform: translateY(0) |
| @keyframes qd-rule | from | transform: scaleX(0) |
| @keyframes qd-rule | to | transform: scaleX(1) |
| @keyframes qd-grid-drift | 0% | background-position: 0 0, 0 0 |
| @keyframes qd-grid-drift | 100% | background-position: 48px 48px, 48px 48px |

**`动画`**

## 响应式

`响应式` =

| 媒体 | 选择器 | 属性 | 值 |
|------|--------|------|-----|
| (max-width: 560px) | .masthead-lockup | --mark-size | clamp(2.35rem, 11vw, 2.75rem) |
| (max-width: 560px) | .masthead-lockup | column-gap | 0.8rem |
| (prefers-reduced-motion: no-preference) | body | animation | qd-grid-drift 32s linear infinite |
| (prefers-reduced-motion: no-preference) | body.is-ready .nav-brand | animation | qd-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both |
| (prefers-reduced-motion: no-preference) | body.is-ready .masthead-lockup | animation | qd-masthead 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .mq-img.brand-logo | animation | qd-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both |
| (prefers-reduced-motion: no-preference) | body.is-ready .masthead-lockup .mq-img.brand-logo | animation | none |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro .kicker | animation | qd-kicker 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro h1 | animation | qd-masthead 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .masthead-lockup h1 | animation | none |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro .lede | animation | qd-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .masthead-lockup .lede | animation | qd-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro | position | relative |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | content | "" |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | position | absolute |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | left | 0 |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | right | 0 |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | bottom | 0 |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | height | 1px |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | background | var(--line) |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | transform-origin | left |
| (prefers-reduced-motion: no-preference) | body.is-ready .main-intro::after | animation | qd-rule 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card | animation | qd-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(1) | animation-delay | 0.28s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(2) | animation-delay | 0.34s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(3) | animation-delay | 0.4s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(4) | animation-delay | 0.46s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(5) | animation-delay | 0.52s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(6) | animation-delay | 0.58s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(7) | animation-delay | 0.64s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(8) | animation-delay | 0.7s |
| (prefers-reduced-motion: no-preference) | body.is-ready .content.cards .card:nth-child(n+9) | animation-delay | 0.74s |
| (prefers-reduced-motion: no-preference) | body.is-ready .article-meta | animation | qd-kicker 0.5s cubic-bezier(0.16, 1, 0.3, 1) both |
| (prefers-reduced-motion: no-preference) | body.is-ready .article-title | animation | qd-masthead 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.06s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .article-tags | animation | qd-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both |
| (prefers-reduced-motion: no-preference) | body.is-ready .article .article-body.md | animation | qd-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both |
| (prefers-reduced-motion: no-preference) | .qd-reveal | opacity | 0 |
| (prefers-reduced-motion: no-preference) | .qd-reveal | transform | translateY(16px) |
| (prefers-reduced-motion: no-preference) | .qd-reveal | filter | blur(3px) |
| (prefers-reduced-motion: no-preference) | .qd-reveal | transition | opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.65s cubic-bezier(0.16, 1, 0.3, 1) |
| (prefers-reduced-motion: no-preference) | .qd-reveal.qd-in | opacity | 1 |
| (prefers-reduced-motion: no-preference) | .qd-reveal.qd-in | transform | translateY(0) |
| (prefers-reduced-motion: no-preference) | .qd-reveal.qd-in | filter | blur(0) |
| (prefers-reduced-motion: no-preference) | .content.cards .card:hover::before | transition | color 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) |
| (prefers-reduced-motion: no-preference) | .content.cards .card:hover::before | transform | translateY(-2px) |
| (prefers-reduced-motion: no-preference) | #qd-progress | transition | width 0.08s linear |
| (prefers-reduced-motion: no-preference) | html.theme-switching body, html.theme-switching .mq-img.brand-logo img | transition | opacity 0.2s ease, background-color 0.2s ease, color 0.2s ease |
| (prefers-reduced-motion: no-preference) | html.theme-switching .mq-img.brand-logo img | opacity | 0.55 |
| (prefers-reduced-motion: reduce) | body | animation | none !important |
| (prefers-reduced-motion: reduce) | .main-intro | border-bottom | 1px solid var(--line) |
| (prefers-reduced-motion: reduce) | .main-intro .kicker, .main-intro h1, .main-intro .lede, .masthead-lockup, .mq-img.brand-logo, .content.cards .card, .article-title, .article-meta, .article-tags, .article .article-body.md, .qd-reveal | animation | none !important |
| (prefers-reduced-motion: reduce) | .main-intro .kicker, .main-intro h1, .main-intro .lede, .masthead-lockup, .mq-img.brand-logo, .content.cards .card, .article-title, .article-meta, .article-tags, .article .article-body.md, .qd-reveal | opacity | 1 !important |
| (prefers-reduced-motion: reduce) | .main-intro .kicker, .main-intro h1, .main-intro .lede, .masthead-lockup, .mq-img.brand-logo, .content.cards .card, .article-title, .article-meta, .article-tags, .article .article-body.md, .qd-reveal | transform | none !important |
| (prefers-reduced-motion: reduce) | .main-intro .kicker, .main-intro h1, .main-intro .lede, .masthead-lockup, .mq-img.brand-logo, .content.cards .card, .article-title, .article-meta, .article-tags, .article .article-body.md, .qd-reveal | filter | none !important |
| (prefers-reduced-motion: reduce) | .main-intro .kicker, .main-intro h1, .main-intro .lede, .masthead-lockup, .mq-img.brand-logo, .content.cards .card, .article-title, .article-meta, .article-tags, .article .article-body.md, .qd-reveal | clip-path | none !important |

**`响应式`**

## 全局

*表规则 = > 规则*
*表动画 = > 动画*
*表响应式 = > 响应式*

*css规则 = > 网页.样式装配 名="规则" 表=`表规则`*
*css动画 = > 网页.样式装配 名="动画" 表=`表动画`*
*css响应式 = > 网页.样式装配 名="响应式" 表=`表响应式`*

`css段` =

| css |
|-----|
| `css规则` |
| `css动画` |
| `css响应式` |

*css = > text.str_join xs=`css段` sep=""*
**css**
