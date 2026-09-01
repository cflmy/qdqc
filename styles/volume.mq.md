---
title: styles/volume
description: 专栏书架、刊头导读与量子新闻侧栏样式。
import 网页:ext/web/网页.mq.md
import text:lib/text.mq.md
---

由 public/volume.css 迁入的样式表。含 `/` 的值已加引号（Marqdo 0.3.2+）。
禁止在本文件顶层使用无序列表符号。

## 规则

`规则` =

| 选择器 | 属性 | 值 |
|--------|------|-----|
| body.layout-shelf, body.layout-volume | grid-template-columns | 1fr !important |
| body.layout-shelf, body.layout-volume | grid-template-areas | "\"top\" \"main\" \"foot\" !important" |
| body.layout-shelf aside.side, body.layout-volume aside.side | display | none !important |
| body.layout-shelf aside.side-rail, body.layout-volume aside.side-rail, body.layout-news aside.side-rail | display | none !important |
| body.layout-shelf main.main, body.layout-volume main.main | width | 100% |
| body.layout-shelf main.main, body.layout-volume main.main | max-width | none |
| body.layout-shelf main.main, body.layout-volume main.main | padding | 0 |
| body.layout-shelf main.main, body.layout-volume main.main | margin | 0 |
| body.layout-shelf main.main > .main-intro, body.layout-shelf main.main > .content.cards, body.layout-volume main.main > .main-intro, body.layout-volume main.main > .content.cards, body.layout-shelf main.main > .mq-images, body.layout-volume main.main > .mq-images | display | none !important |
| .vol-shelf | position | relative |
| .vol-shelf | min-height | calc(100vh - 8rem) |
| .vol-shelf | padding | clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3.5rem) 4rem |
| .vol-shelf | background | radial-gradient(ellipse 80% 55% at 20% 0%, color-mix(in srgb, var(--mark) 12%, transparent), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 30%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%), var(--bg) |
| .vol-shelf-head | display | grid |
| .vol-shelf-head | grid-template-columns | auto 1fr |
| .vol-shelf-head | gap | 1.25rem 2rem |
| .vol-shelf-head | align-items | end |
| .vol-shelf-head | margin-bottom | clamp(2rem, 5vw, 3.5rem) |
| .vol-shelf-head | max-width | 72rem |
| .vol-shelf-kicker | writing-mode | vertical-rl |
| .vol-shelf-kicker | transform | rotate(180deg) |
| .vol-shelf-kicker | font-family | var(--mono) |
| .vol-shelf-kicker | font-size | .7rem |
| .vol-shelf-kicker | letter-spacing | .28em |
| .vol-shelf-kicker | text-transform | uppercase |
| .vol-shelf-kicker | color | var(--mark) |
| .vol-shelf-kicker | margin | 0 |
| .vol-shelf-kicker | padding-bottom | .35rem |
| .vol-shelf-title | margin | 0 |
| .vol-shelf-title | font-family | var(--serif) |
| .vol-shelf-title | font-size | clamp(2.8rem, 8vw, 4.75rem) |
| .vol-shelf-title | font-weight | 700 |
| .vol-shelf-title | letter-spacing | .08em |
| .vol-shelf-title | line-height | .95 |
| .vol-shelf-lede | grid-column | 2 |
| .vol-shelf-lede | margin | .35rem 0 0 |
| .vol-shelf-lede | max-width | 28rem |
| .vol-shelf-lede | color | var(--muted) |
| .vol-shelf-lede | font-size | 1.05rem |
| .vol-books | display | grid |
| .vol-books | grid-template-columns | repeat(12, minmax(0, 1fr)) |
| .vol-books | grid-auto-rows | minmax(9.5rem, auto) |
| .vol-books | gap | clamp(.85rem, 1.8vw, 1.35rem) |
| .vol-books | max-width | 88rem |
| .vol-books | align-items | stretch |
| .vol-book | position | relative |
| .vol-book | display | grid |
| .vol-book | grid-template-rows | minmax(8rem, 1fr) auto |
| .vol-book | text-decoration | none |
| .vol-book | color | inherit |
| .vol-book | background | var(--card) |
| .vol-book | border | 1px solid var(--line) |
| .vol-book | overflow | hidden |
| .vol-book | min-height | 0 |
| .vol-book | transition | transform .28s ease, border-color .28s ease |
| .vol-book:hover | transform | translateY(-4px) |
| .vol-book:hover | border-color | color-mix(in srgb, var(--vol-accent, var(--mark)) 45%, var(--line)) |
| .vol-book:hover | color | inherit |
| .vol-book[data-vol="1"] | --vol-accent | var(--accent) |
| .vol-book[data-vol="1"] | grid-column | "1 / 8" |
| .vol-book[data-vol="1"] | grid-row | "1 / 3" |
| .vol-book[data-vol="1"] | min-height | clamp(26rem, 58vh, 34rem) |
| .vol-book[data-vol="2"] | --vol-accent | var(--mark) |
| .vol-book[data-vol="2"] | grid-column | "8 / 13" |
| .vol-book[data-vol="2"] | grid-row | 1 |
| .vol-book[data-vol="2"] | min-height | clamp(12.5rem, 26vh, 16rem) |
| .vol-book[data-vol="3"] | --vol-accent | var(--accent-2) |
| .vol-book[data-vol="3"] | grid-column | "8 / 13" |
| .vol-book[data-vol="3"] | grid-row | 2 |
| .vol-book[data-vol="3"] | min-height | clamp(12.5rem, 26vh, 16rem) |
| .vol-book-media | position | relative |
| .vol-book-media | overflow | hidden |
| .vol-book-media | background | var(--bg-2) |
| .vol-book-media | min-height | 7rem |
| .vol-book-media img | width | 100% |
| .vol-book-media img | height | 100% |
| .vol-book-media img | object-fit | cover |
| .vol-book-media img | object-position | 50% 40% |
| .vol-book-media img | display | block |
| .vol-book-media img | transition | transform .45s ease |
| .vol-book:hover .vol-book-media img | transform | scale(1.04) |
| .vol-book-media::after | content | "" |
| .vol-book-media::after | position | absolute |
| .vol-book-media::after | inset | 0 |
| .vol-book-media::after | background | linear-gradient(to top, color-mix(in srgb, var(--card) 88%, transparent), transparent 55%) |
| .vol-book-media::after | pointer-events | none |
| .vol-book[data-vol="1"] .vol-book-media | min-height | 58% |
| .vol-book-body | position | relative |
| .vol-book-body | z-index | 1 |
| .vol-book-body | display | flex |
| .vol-book-body | flex-direction | column |
| .vol-book-body | justify-content | space-between |
| .vol-book-body | gap | .75rem |
| .vol-book-body | padding | 1.1rem 1.2rem 1.2rem |
| .vol-book-no | font-family | var(--mono) |
| .vol-book-no | font-size | .68rem |
| .vol-book-no | letter-spacing | .2em |
| .vol-book-no | text-transform | uppercase |
| .vol-book-no | color | var(--faint) |
| .vol-book-no strong | margin-left | .35rem |
| .vol-book-no strong | color | var(--vol-accent, var(--mark)) |
| .vol-book-no strong | font-weight | 600 |
| .vol-book[data-vol="1"] .vol-book-no strong | display | block |
| .vol-book[data-vol="1"] .vol-book-no strong | margin | .35rem 0 0 |
| .vol-book[data-vol="1"] .vol-book-no strong | font-family | var(--serif) |
| .vol-book[data-vol="1"] .vol-book-no strong | font-size | clamp(2.4rem, 5vw, 3.4rem) |
| .vol-book[data-vol="1"] .vol-book-no strong | font-weight | 700 |
| .vol-book[data-vol="1"] .vol-book-no strong | letter-spacing | .04em |
| .vol-book[data-vol="1"] .vol-book-no strong | line-height | 1 |
| .vol-book-name | margin | .35rem 0 .4rem |
| .vol-book-name | font-family | var(--serif) |
| .vol-book-name | font-size | clamp(1.25rem, 2.2vw, 1.85rem) |
| .vol-book-name | letter-spacing | .05em |
| .vol-book-name | line-height | 1.2 |
| .vol-book[data-vol="1"] .vol-book-name | font-size | clamp(1.7rem, 3.2vw, 2.35rem) |
| .vol-book-summary | margin | 0 |
| .vol-book-summary | color | var(--muted) |
| .vol-book-summary | font-size | .92rem |
| .vol-book-summary | line-height | 1.6 |
| .vol-book-summary | max-width | 34rem |
| .vol-book[data-vol="2"] .vol-book-summary, .vol-book[data-vol="3"] .vol-book-summary | display | -webkit-box |
| .vol-book[data-vol="2"] .vol-book-summary, .vol-book[data-vol="3"] .vol-book-summary | -webkit-line-clamp | 2 |
| .vol-book[data-vol="2"] .vol-book-summary, .vol-book[data-vol="3"] .vol-book-summary | -webkit-box-orient | vertical |
| .vol-book[data-vol="2"] .vol-book-summary, .vol-book[data-vol="3"] .vol-book-summary | overflow | hidden |
| .vol-book-foot | display | flex |
| .vol-book-foot | justify-content | space-between |
| .vol-book-foot | align-items | baseline |
| .vol-book-foot | margin-top | .35rem |
| .vol-book-foot | font-family | var(--mono) |
| .vol-book-foot | font-size | .68rem |
| .vol-book-foot | letter-spacing | .12em |
| .vol-book-foot | text-transform | uppercase |
| .vol-book-foot | color | var(--faint) |
| .vol-book-foot em | font-style | normal |
| .vol-book-foot em | color | var(--vol-accent, var(--mark)) |
| .vol-open | position | relative |
| .vol-open | background | var(--bg) |
| .vol-spread | display | grid |
| .vol-spread | grid-template-columns | minmax(4.5rem, 7rem) minmax(0, 1.05fr) minmax(0, 1.15fr) |
| .vol-spread | gap | 0 |
| .vol-spread | min-height | clamp(18rem, 42vh, 26rem) |
| .vol-spread | border-bottom | 1px solid var(--line) |
| .vol-spread | max-width | 88rem |
| .vol-spread | margin | 0 auto |
| .vol-spine | display | flex |
| .vol-spine | flex-direction | column |
| .vol-spine | justify-content | space-between |
| .vol-spine | align-items | center |
| .vol-spine | padding | 2rem .75rem |
| .vol-spine | background | color-mix(in srgb, var(--vol-accent, var(--mark)) 12%, var(--bg-2)) |
| .vol-spine | border-right | 1px solid var(--line) |
| .vol-spine-label | writing-mode | vertical-rl |
| .vol-spine-label | transform | rotate(180deg) |
| .vol-spine-label | font-family | var(--mono) |
| .vol-spine-label | font-size | .68rem |
| .vol-spine-label | letter-spacing | .32em |
| .vol-spine-label | text-transform | uppercase |
| .vol-spine-label | color | var(--vol-accent, var(--mark)) |
| .vol-spine-no | writing-mode | vertical-rl |
| .vol-spine-no | transform | rotate(180deg) |
| .vol-spine-no | font-family | var(--serif) |
| .vol-spine-no | font-size | clamp(2.2rem, 4vw, 3rem) |
| .vol-spine-no | font-weight | 700 |
| .vol-spine-no | letter-spacing | .08em |
| .vol-spine-no | color | var(--ink) |
| .vol-recto | padding | clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.75rem) |
| .vol-verso | border-right | 1px solid var(--line) |
| .vol-verso | display | flex |
| .vol-verso | flex-direction | column |
| .vol-verso | justify-content | flex-end |
| .vol-verso | position | relative |
| .vol-verso | overflow | hidden |
| .vol-verso | background | var(--bg-2) |
| .vol-verso | padding | 0 |
| .vol-verso-cover | position | absolute |
| .vol-verso-cover | inset | 0 |
| .vol-verso-cover | width | 100% |
| .vol-verso-cover | height | 100% |
| .vol-verso-cover | object-fit | cover |
| .vol-verso-cover | object-position | 50% 35% |
| .vol-verso-cover | opacity | .55 |
| .vol-verso-copy | position | relative |
| .vol-verso-copy | z-index | 1 |
| .vol-verso-copy | padding | clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.75rem) |
| .vol-verso-copy | background | linear-gradient(to top, color-mix(in srgb, var(--bg) 92%, transparent) 35%, transparent) |
| .vol-verso .vol-kicker | margin | 0 0 1rem |
| .vol-verso .vol-kicker | font-family | var(--mono) |
| .vol-verso .vol-kicker | font-size | .7rem |
| .vol-verso .vol-kicker | letter-spacing | .24em |
| .vol-verso .vol-kicker | text-transform | uppercase |
| .vol-verso .vol-kicker | color | var(--faint) |
| .vol-verso h1 | margin | 0 |
| .vol-verso h1 | font-family | var(--serif) |
| .vol-verso h1 | font-size | clamp(2.2rem, 5vw, 3.4rem) |
| .vol-verso h1 | letter-spacing | .06em |
| .vol-verso h1 | line-height | 1.1 |
| .vol-recto | display | flex |
| .vol-recto | flex-direction | column |
| .vol-recto | justify-content | flex-end |
| .vol-recto | gap | 1.1rem |
| .vol-recto .vol-blurb | margin | 0 |
| .vol-recto .vol-blurb | font-size | clamp(1.02rem, 1.6vw, 1.18rem) |
| .vol-recto .vol-blurb | line-height | 1.75 |
| .vol-recto .vol-blurb | color | var(--ink-soft) |
| .vol-recto .vol-blurb | max-width | 28rem |
| .vol-recto .vol-meta | display | flex |
| .vol-recto .vol-meta | flex-wrap | wrap |
| .vol-recto .vol-meta | gap | .75rem 1.25rem |
| .vol-recto .vol-meta | font-family | var(--mono) |
| .vol-recto .vol-meta | font-size | .72rem |
| .vol-recto .vol-meta | letter-spacing | .14em |
| .vol-recto .vol-meta | text-transform | uppercase |
| .vol-recto .vol-meta | color | var(--faint) |
| .vol-recto .vol-start | align-self | flex-start |
| .vol-recto .vol-start | margin-top | .35rem |
| .vol-recto .vol-start | padding | .7rem 1.15rem |
| .vol-recto .vol-start | border | 1px solid var(--ink) |
| .vol-recto .vol-start | background | transparent |
| .vol-recto .vol-start | color | var(--ink) |
| .vol-recto .vol-start | font-family | var(--mono) |
| .vol-recto .vol-start | font-size | .78rem |
| .vol-recto .vol-start | letter-spacing | .14em |
| .vol-recto .vol-start | text-transform | uppercase |
| .vol-recto .vol-start | text-decoration | none |
| .vol-recto .vol-start | transition | background .2s ease, color .2s ease |
| .vol-recto .vol-start:hover | background | var(--ink) |
| .vol-recto .vol-start:hover | color | var(--bg) |
| .vol-toc | max-width | 88rem |
| .vol-toc | margin | 0 auto |
| .vol-toc | padding | clamp(2rem, 4vw, 3.25rem) clamp(1.25rem, 4vw, 3.5rem) 4.5rem |
| .vol-toc-head | display | flex |
| .vol-toc-head | justify-content | space-between |
| .vol-toc-head | align-items | baseline |
| .vol-toc-head | gap | 1rem |
| .vol-toc-head | margin-bottom | 1.5rem |
| .vol-toc-head | padding-bottom | .85rem |
| .vol-toc-head | border-bottom | 1px solid var(--line) |
| .vol-toc-head h2 | margin | 0 |
| .vol-toc-head h2 | font-family | var(--serif) |
| .vol-toc-head h2 | font-size | 1.35rem |
| .vol-toc-head h2 | letter-spacing | .12em |
| .vol-toc-head a | font-family | var(--mono) |
| .vol-toc-head a | font-size | .72rem |
| .vol-toc-head a | letter-spacing | .14em |
| .vol-toc-head a | text-transform | uppercase |
| .vol-toc-head a | color | var(--faint) |
| .vol-toc-list | list-style | none |
| .vol-toc-list | margin | 0 |
| .vol-toc-list | padding | 0 |
| .vol-toc-list li | border-bottom | 1px solid var(--line) |
| .vol-toc-list a | display | grid |
| .vol-toc-list a | grid-template-columns | 3.5rem 1fr auto |
| .vol-toc-list a | gap | 1rem 1.25rem |
| .vol-toc-list a | align-items | baseline |
| .vol-toc-list a | padding | 1.25rem 0 |
| .vol-toc-list a | text-decoration | none |
| .vol-toc-list a | color | inherit |
| .vol-toc-list a:hover .vol-toc-title | color | var(--vol-accent, var(--mark)) |
| .vol-toc-num | font-family | var(--serif) |
| .vol-toc-num | font-size | clamp(1.6rem, 3vw, 2.1rem) |
| .vol-toc-num | font-weight | 700 |
| .vol-toc-num | letter-spacing | .04em |
| .vol-toc-num | color | var(--vol-accent, var(--mark)) |
| .vol-toc-num | line-height | 1 |
| .vol-toc-title | font-family | var(--serif) |
| .vol-toc-title | font-size | clamp(1.15rem, 2vw, 1.4rem) |
| .vol-toc-title | letter-spacing | .03em |
| .vol-toc-title | line-height | 1.35 |
| .vol-toc-summary | grid-column | 2 |
| .vol-toc-summary | margin | .2rem 0 0 |
| .vol-toc-summary | color | var(--muted) |
| .vol-toc-summary | font-size | .92rem |
| .vol-toc-summary | line-height | 1.6 |
| .vol-toc-summary | max-width | 36rem |
| .vol-toc-page | font-family | var(--mono) |
| .vol-toc-page | font-size | .72rem |
| .vol-toc-page | letter-spacing | .12em |
| .vol-toc-page | color | var(--faint) |
| .vol-toc-page | white-space | nowrap |
| .vol-toc-empty | padding | 2rem 0 |
| .vol-toc-empty | color | var(--muted) |
| .column-gate.column-gate--shelf | margin | 0 |
| .column-gate.column-gate--shelf | padding | 0 |
| .column-gate.column-gate--shelf | border | 0 |
| .column-gate.column-gate--shelf | max-width | none |
| .column-gate.column-gate--shelf | width | 100% |
| .main-intro > .column-gate.column-gate--shelf | margin-top | 1.5rem |
| .main-intro > .column-gate.column-gate--shelf | max-width | 36rem |
| .column-gate.column-gate--shelf .column-gate-label | margin-bottom | .85rem |
| .column-gate.column-gate--shelf .column-gate-list | display | grid |
| .column-gate.column-gate--shelf .column-gate-list | grid-template-columns | repeat(6, minmax(0, 1fr)) |
| .column-gate.column-gate--shelf .column-gate-list | grid-auto-rows | minmax(6.5rem, auto) |
| .column-gate.column-gate--shelf .column-gate-list | gap | .7rem |
| .column-gate.column-gate--shelf .column-gate-list | width | 100% |
| .column-gate.column-gate--shelf .column-gate-list li | margin | 0 |
| .column-gate.column-gate--shelf .column-gate-list li | min-width | 0 |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(1) | grid-column | "1 / 5" |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(1) | grid-row | "1 / 3" |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(2) | grid-column | "5 / 7" |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(2) | grid-row | 1 |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(3) | grid-column | "5 / 7" |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(3) | grid-row | 2 |
| .column-gate.column-gate--shelf .column-gate-list a | display | grid |
| .column-gate.column-gate--shelf .column-gate-list a | grid-template-rows | minmax(4.5rem, 1fr) auto |
| .column-gate.column-gate--shelf .column-gate-list a | height | 100% |
| .column-gate.column-gate--shelf .column-gate-list a | min-height | 8rem |
| .column-gate.column-gate--shelf .column-gate-list a | padding | 0 |
| .column-gate.column-gate--shelf .column-gate-list a | border | 1px solid var(--line) |
| .column-gate.column-gate--shelf .column-gate-list a | background | var(--card) |
| .column-gate.column-gate--shelf .column-gate-list a | overflow | hidden |
| .column-gate.column-gate--shelf .column-gate-list a | transition | transform .22s ease, border-color .22s ease |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(1) a | min-height | clamp(15rem, 36vh, 22rem) |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(1) a | --vol-accent | var(--accent) |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(2) a | min-height | clamp(7.5rem, 16vh, 10.5rem) |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(2) a | --vol-accent | var(--mark) |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(3) a | min-height | clamp(7.5rem, 16vh, 10.5rem) |
| .column-gate.column-gate--shelf .column-gate-list li:nth-child(3) a | --vol-accent | var(--accent-2) |
| .column-gate.column-gate--shelf .column-gate-list a:hover | transform | translateY(-3px) |
| .column-gate.column-gate--shelf .column-gate-list a:hover | border-color | color-mix(in srgb, var(--vol-accent, var(--mark)) 40%, var(--line)) |
| .column-gate.column-gate--shelf .column-gate-list a:hover | color | inherit |
| .column-gate.column-gate--shelf .cg-media | position | relative |
| .column-gate.column-gate--shelf .cg-media | min-height | 4.5rem |
| .column-gate.column-gate--shelf .cg-media | overflow | hidden |
| .column-gate.column-gate--shelf .cg-media | background | var(--bg-2) |
| .column-gate.column-gate--shelf .cg-media img | width | 100% |
| .column-gate.column-gate--shelf .cg-media img | height | 100% |
| .column-gate.column-gate--shelf .cg-media img | object-fit | cover |
| .column-gate.column-gate--shelf .cg-media img | display | block |
| .column-gate.column-gate--shelf .cg-media img | transition | transform .4s ease |
| .column-gate.column-gate--shelf .column-gate-list a:hover .cg-media img | transform | scale(1.03) |
| .column-gate.column-gate--shelf .cg-copy | padding | .7rem .85rem .85rem |
| .column-gate.column-gate--shelf .cg-vol | font-family | var(--mono) |
| .column-gate.column-gate--shelf .cg-vol | font-size | .62rem |
| .column-gate.column-gate--shelf .cg-vol | letter-spacing | .16em |
| .column-gate.column-gate--shelf .cg-vol | text-transform | uppercase |
| .column-gate.column-gate--shelf .cg-vol | color | var(--faint) |
| .column-gate.column-gate--shelf .cg-name | margin-top | .3rem |
| .column-gate.column-gate--shelf .cg-name | font-family | var(--serif) |
| .column-gate.column-gate--shelf .cg-name | font-size | 1.05rem |
| .column-gate.column-gate--shelf .cg-name | letter-spacing | .04em |
| .column-gate.column-gate--shelf .cg-name | display | block |
| .column-gate.column-gate--shelf li:nth-child(1) .cg-name | font-size | clamp(1.2rem, 2vw, 1.55rem) |
| .column-gate.column-gate--shelf .cg-desc | margin-top | .3rem |
| .column-gate.column-gate--shelf .cg-desc | font-size | .82rem |
| .column-gate.column-gate--shelf .cg-desc | color | var(--muted) |
| .column-gate.column-gate--shelf .cg-desc | line-height | 1.45 |
| .column-gate.column-gate--shelf .cg-desc | display | -webkit-box |
| .column-gate.column-gate--shelf .cg-desc | -webkit-line-clamp | 2 |
| .column-gate.column-gate--shelf .cg-desc | -webkit-box-orient | vertical |
| .column-gate.column-gate--shelf .cg-desc | overflow | hidden |
| .column-gate.column-gate--shelf li:nth-child(2) .cg-desc, .column-gate.column-gate--shelf li:nth-child(3) .cg-desc | display | none |
| .column-gate.column-gate--shelf .column-gate-more | margin-top | .9rem |
| .home-toc-label | margin | 2.25rem 0 .85rem |
| .home-toc-label | font-family | var(--mono) |
| .home-toc-label | font-size | .68rem |
| .home-toc-label | letter-spacing | .2em |
| .home-toc-label | text-transform | uppercase |
| .home-toc-label | color | var(--mark) |
| body.has-sidebar.has-rail | grid-template-columns | minmax(9.5rem, 11.5rem) minmax(0, 1fr) minmax(14.5rem, 17.5rem) |
| body.has-sidebar.has-rail | grid-template-areas | "\"top top top\" \"side main rail\" \"foot foot foot\"" |
| body.has-sidebar.has-rail | column-gap | 0 |
| body.has-sidebar.has-rail main.main | max-width | none |
| body.has-sidebar.has-rail main.main | width | 100% |
| body.has-sidebar.has-rail main.main | padding-left | clamp(1rem, 2.2vw, 1.75rem) |
| body.has-sidebar.has-rail main.main | padding-right | clamp(.85rem, 1.6vw, 1.35rem) |
| body.has-sidebar.has-rail .main-intro.masthead-split | max-width | none |
| body.has-sidebar.has-rail .main-intro.masthead-split | width | 100% |
| body.has-sidebar.has-rail .main-intro.masthead-split | display | grid |
| body.has-sidebar.has-rail .main-intro.masthead-split | grid-template-columns | minmax(0, 1.15fr) minmax(12rem, 0.85fr) |
| body.has-sidebar.has-rail .main-intro.masthead-split | gap | clamp(1rem, 2.5vw, 2rem) |
| body.has-sidebar.has-rail .main-intro.masthead-split | align-items | start |
| body.has-sidebar.has-rail .main-intro.masthead-split | margin-bottom | 1.5rem |
| body.has-sidebar.has-rail .main-intro.masthead-split | padding-bottom | 1.15rem |
| body.has-sidebar.has-rail .main-intro.masthead-split | border-bottom | 1px solid var(--line) |
| .masthead-brand | min-width | 0 |
| .masthead-brand | max-width | 28rem |
| .masthead-brand .kicker | margin-bottom | .75rem |
| .masthead-brand h1, .masthead-brand .masthead-lockup .masthead-copy h1 | font-size | clamp(2rem, 4.2vw, 2.75rem) |
| .masthead-brand p.lede, .masthead-brand .masthead-lockup .lede | margin-top | .45rem |
| .masthead-brand p.lede, .masthead-brand .masthead-lockup .lede | font-size | clamp(.98rem, 1.5vw, 1.08rem) |
| .masthead-guide | min-width | 0 |
| .masthead-guide | padding | .15rem 0 0 .95rem |
| .masthead-guide | border-left | 1px solid var(--line) |
| .masthead-guide | align-self | stretch |
| .mg-label | margin | 0 0 .45rem |
| .mg-label | font-family | var(--mono) |
| .mg-label | font-size | .62rem |
| .mg-label | letter-spacing | .18em |
| .mg-label | text-transform | uppercase |
| .mg-label | color | var(--mark) |
| .mg-blurb | margin | 0 0 .7rem |
| .mg-blurb | font-size | .84rem |
| .mg-blurb | line-height | 1.45 |
| .mg-blurb | color | var(--muted) |
| .mg-blurb a | margin-left | .25rem |
| .mg-blurb a | font-family | var(--mono) |
| .mg-blurb a | font-size | .72rem |
| .mg-blurb a | letter-spacing | .04em |
| .mg-blurb a | color | var(--mark) |
| .mg-blurb a | text-decoration | none |
| .mg-blurb a | white-space | nowrap |
| .mg-blurb a:hover | color | var(--ink) |
| .mg-sub | margin | 0 0 .35rem |
| .mg-sub | font-family | var(--mono) |
| .mg-sub | font-size | .58rem |
| .mg-sub | letter-spacing | .16em |
| .mg-sub | text-transform | uppercase |
| .mg-sub | color | var(--faint) |
| .mg-path | list-style | none |
| .mg-path | margin | 0 0 .7rem |
| .mg-path | padding | 0 |
| .mg-path | display | flex |
| .mg-path | flex-wrap | wrap |
| .mg-path | gap | .35rem .75rem |
| .mg-path | counter-reset | mg-path |
| .mg-path li | counter-increment | mg-path |
| .mg-path a | display | inline-flex |
| .mg-path a | align-items | baseline |
| .mg-path a | gap | .3rem |
| .mg-path a | font-family | var(--serif) |
| .mg-path a | font-size | .9rem |
| .mg-path a | text-decoration | none |
| .mg-path a | color | inherit |
| .mg-path a::before | content | counter(mg-path, decimal-leading-zero) |
| .mg-path a::before | font-family | var(--mono) |
| .mg-path a::before | font-size | .62rem |
| .mg-path a::before | letter-spacing | .06em |
| .mg-path a::before | color | var(--faint) |
| .mg-path a:hover | color | var(--mark) |
| .mg-path-soft a | color | var(--muted) |
| .mg-path-soft a | font-size | .85rem |
| .mg-tags | display | flex |
| .mg-tags | flex-wrap | wrap |
| .mg-tags | gap | .25rem .5rem |
| .mg-tags | margin-bottom | .45rem |
| .mg-pins | display | grid |
| .mg-pins | gap | .2rem |
| .mg-pins a | font-family | var(--serif) |
| .mg-pins a | font-size | .86rem |
| .mg-pins a | text-decoration | none |
| .mg-pins a | color | var(--ink-soft) |
| .mg-pins a | border-bottom | 1px solid transparent |
| .mg-pins a:hover | color | var(--mark) |
| .mg-pins a:hover | border-bottom-color | color-mix(in srgb, var(--mark) 35%, transparent) |
| .side-tag | font-family | var(--mono) |
| .side-tag | font-size | .62rem |
| .side-tag | letter-spacing | .1em |
| .side-tag | text-transform | uppercase |
| .side-tag | color | var(--muted) |
| .side-tag | text-decoration | none |
| .side-tag | border-bottom | 1px solid transparent |
| .side-tag:hover | color | var(--mark) |
| .side-tag:hover | border-bottom-color | color-mix(in srgb, var(--mark) 40%, transparent) |
| body.has-sidebar.has-rail main.main > .column-gate.column-gate--shelf | max-width | none |
| body.has-sidebar.has-rail main.main > .column-gate.column-gate--shelf | width | 100% |
| body.has-sidebar.has-rail main.main > .column-gate.column-gate--shelf | margin-top | .15rem |
| .main-intro > .column-gate.column-gate--shelf | margin-top | 1.5rem |
| .main-intro > .column-gate.column-gate--shelf | max-width | 36rem |
| body.has-sidebar.has-rail .content.cards, body.has-sidebar.has-rail .home-toc-label | max-width | min(42rem, 100%) |
| aside.side-rail | grid-area | rail |
| aside.side-rail | align-self | start |
| aside.side-rail | position | sticky |
| aside.side-rail | top | 4.25rem |
| aside.side-rail | margin | 2.25rem clamp(.75rem, 1.5vw, 1.25rem) 2rem 0 |
| aside.side-rail | padding | 0 0 0 1.15rem |
| aside.side-rail | border-left | 1px solid var(--line) |
| aside.side-rail | min-width | 0 |
| aside.side-rail | max-height | calc(100vh - 5rem) |
| aside.side-rail | display | flex |
| aside.side-rail | flex-direction | column |
| aside.side-rail | overflow | hidden |
| .side-rail-head | display | flex |
| .side-rail-head | align-items | baseline |
| .side-rail-head | justify-content | space-between |
| .side-rail-head | gap | .75rem |
| .side-rail-head | flex | 0 0 auto |
| .side-rail-head | margin | 0 0 .65rem |
| .side-rail-head | padding-right | .15rem |
| .side-rail-label | display | block |
| .side-rail-label | margin | 0 |
| .side-rail-label | font-family | var(--mono) |
| .side-rail-label | font-size | .66rem |
| .side-rail-label | letter-spacing | .18em |
| .side-rail-label | text-transform | uppercase |
| .side-rail-label | color | var(--mark) |
| .side-rail-jump | flex | 0 0 auto |
| .side-rail-jump | font-family | var(--mono) |
| .side-rail-jump | font-size | .95rem |
| .side-rail-jump | line-height | 1 |
| .side-rail-jump | letter-spacing | .04em |
| .side-rail-jump | color | var(--mark) |
| .side-rail-jump | text-decoration | none |
| .side-rail-jump | padding | .15rem .1rem |
| .side-rail-jump | transition | transform .2s ease, color .2s ease |
| .side-rail-jump:hover | color | var(--ink) |
| .side-rail-jump:hover | transform | translateX(3px) |
| .side-rail-body | position | relative |
| .side-rail-body | flex | 1 1 auto |
| .side-rail-body | min-height | 0 |
| .side-rail-body | overflow | hidden |
| .side-rail-body::after | content | "" |
| .side-rail-body::after | position | absolute |
| .side-rail-body::after | left | 0 |
| .side-rail-body::after | right | 0 |
| .side-rail-body::after | bottom | 0 |
| .side-rail-body::after | height | 3.25rem |
| .side-rail-body::after | pointer-events | none |
| .side-rail-body::after | background | linear-gradient(to bottom, transparent, var(--bg)) |
| .side-news-list | list-style | none |
| .side-news-list | margin | 0 |
| .side-news-list | padding | 0 |
| .side-news-list li | border-bottom | 1px solid var(--line) |
| .side-news-list a | display | grid |
| .side-news-list a | gap | .18rem |
| .side-news-list a | padding | .62rem 0 |
| .side-news-list a | text-decoration | none |
| .side-news-list a | color | inherit |
| .side-news-list a:hover .side-news-title | color | var(--mark) |
| .side-news-meta | display | flex |
| .side-news-meta | flex-wrap | wrap |
| .side-news-meta | gap | .3rem .55rem |
| .side-news-meta | font-family | var(--mono) |
| .side-news-meta | font-size | .6rem |
| .side-news-meta | letter-spacing | .1em |
| .side-news-meta | text-transform | uppercase |
| .side-news-meta | color | var(--faint) |
| .side-news-src | color | var(--muted) |
| .side-news-title | font-family | var(--serif) |
| .side-news-title | font-size | .88rem |
| .side-news-title | line-height | 1.35 |
| .side-news-title | letter-spacing | .02em |
| .side-news-title | display | -webkit-box |
| .side-news-title | -webkit-line-clamp | 3 |
| .side-news-title | -webkit-box-orient | vertical |
| .side-news-title | overflow | hidden |
| body.layout-news main.main > .main-intro, body.layout-news main.main > .content.cards | display | none !important |
| .news-archive | max-width | 42rem |
| .news-archive-kicker | margin | 0 0 .85rem |
| .news-archive-kicker | font-family | var(--mono) |
| .news-archive-kicker | font-size | .68rem |
| .news-archive-kicker | letter-spacing | .24em |
| .news-archive-kicker | text-transform | uppercase |
| .news-archive-kicker | color | var(--mark) |
| .news-archive h1 | margin | 0 |
| .news-archive h1 | font-family | var(--serif) |
| .news-archive h1 | font-size | clamp(2rem, 4vw, 2.75rem) |
| .news-archive h1 | letter-spacing | .08em |
| .news-archive-lede | margin | .65rem 0 0 |
| .news-archive-lede | color | var(--muted) |
| .news-archive-lede | max-width | 28rem |
| .news-archive-list | list-style | none |
| .news-archive-list | margin | 2rem 0 0 |
| .news-archive-list | padding | 0 |
| .news-archive-item | border-bottom | 1px solid var(--line) |
| .news-archive-item a | display | grid |
| .news-archive-item a | gap | .35rem |
| .news-archive-item a | padding | 1.15rem 0 |
| .news-archive-item a | text-decoration | none |
| .news-archive-item a | color | inherit |
| .news-archive-item a:hover .news-archive-title | color | var(--mark) |
| .news-archive-meta | display | flex |
| .news-archive-meta | flex-wrap | wrap |
| .news-archive-meta | gap | .4rem .85rem |
| .news-archive-meta | font-family | var(--mono) |
| .news-archive-meta | font-size | .68rem |
| .news-archive-meta | letter-spacing | .12em |
| .news-archive-meta | text-transform | uppercase |
| .news-archive-meta | color | var(--faint) |
| .news-archive-title | font-family | var(--serif) |
| .news-archive-title | font-size | clamp(1.05rem, 1.8vw, 1.25rem) |
| .news-archive-title | line-height | 1.35 |
| .news-archive-summary | margin | 0 |
| .news-archive-summary | color | var(--muted) |
| .news-archive-summary | font-size | .92rem |
| .news-archive-summary | line-height | 1.55 |
| .news-archive-summary | max-width | 36rem |

**`规则`**

## 响应式

`响应式` =

| 媒体 | 选择器 | 属性 | 值 |
|------|--------|------|-----|
| (max-width: 1100px) | body.has-sidebar.has-rail | grid-template-columns | minmax(10.5rem, 12.5rem) minmax(0, 1fr) |
| (max-width: 1100px) | body.has-sidebar.has-rail | grid-template-areas | "\"top top\" \"side main\" \"foot foot\"" |
| (max-width: 1100px) | aside.side-rail | display | none |
| (max-width: 1100px) | body.has-sidebar.has-rail .main-intro.masthead-split | grid-template-columns | 1fr |
| (max-width: 1100px) | body.has-sidebar.has-rail .main-intro.masthead-split | gap | 1rem |
| (max-width: 1100px) | .masthead-guide | padding | .85rem 0 0 |
| (max-width: 1100px) | .masthead-guide | border-left | 0 |
| (max-width: 1100px) | .masthead-guide | border-top | 1px solid var(--line) |
| (min-width: 1100px) | .vol-shelf, .vol-books, .vol-shelf-head | max-width | none |
| (min-width: 1100px) | body.layout-shelf main.main | padding-left | clamp(1.5rem, 4vw, 3.5rem) |
| (min-width: 1100px) | body.layout-shelf main.main | padding-right | clamp(1.5rem, 4vw, 3.5rem) |
| (max-width: 900px) | .vol-books | grid-template-columns | 1fr |
| (max-width: 900px) | .vol-book[data-vol="1"], .vol-book[data-vol="2"], .vol-book[data-vol="3"] | grid-column | 1 |
| (max-width: 900px) | .vol-book[data-vol="1"], .vol-book[data-vol="2"], .vol-book[data-vol="3"] | grid-row | auto |
| (max-width: 900px) | .vol-book[data-vol="1"], .vol-book[data-vol="2"], .vol-book[data-vol="3"] | min-height | 16rem |
| (max-width: 900px) | .column-gate.column-gate--shelf .column-gate-list | grid-template-columns | 1fr |
| (max-width: 900px) | .column-gate.column-gate--shelf .column-gate-list li:nth-child(1), .column-gate.column-gate--shelf .column-gate-list li:nth-child(2), .column-gate.column-gate--shelf .column-gate-list li:nth-child(3) | grid-column | 1 |
| (max-width: 900px) | .column-gate.column-gate--shelf .column-gate-list li:nth-child(1), .column-gate.column-gate--shelf .column-gate-list li:nth-child(2), .column-gate.column-gate--shelf .column-gate-list li:nth-child(3) | grid-row | auto |
| (max-width: 900px) | .column-gate.column-gate--shelf li:nth-child(2) .cg-desc, .column-gate.column-gate--shelf li:nth-child(3) .cg-desc | display | -webkit-box |
| (max-width: 900px) | .vol-spread | grid-template-columns | 3.25rem 1fr |
| (max-width: 900px) | .vol-recto | grid-column | 2 |
| (max-width: 900px) | .vol-recto | border-top | 1px solid var(--line) |
| (max-width: 900px) | .vol-toc-list a | grid-template-columns | 2.75rem 1fr |
| (max-width: 900px) | .vol-toc-page | display | none |
| (max-width: 900px) | .vol-toc-summary | grid-column | 2 |
| (max-width: 560px) | .vol-shelf-head | grid-template-columns | 1fr |
| (max-width: 560px) | .vol-shelf-kicker | writing-mode | horizontal-tb |
| (max-width: 560px) | .vol-shelf-kicker | transform | none |
| (max-width: 560px) | .vol-shelf-lede | grid-column | 1 |
| (prefers-reduced-motion: reduce) | .vol-book, .column-gate.column-gate--shelf .column-gate-list a | transition | none |
| (prefers-reduced-motion: reduce) | .vol-book:hover, .column-gate.column-gate--shelf .column-gate-list a:hover | transform | none |

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
