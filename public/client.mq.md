---
title: qdqc client
description: theme / drawer / reveal / progress / ui flags — GFM + lib/browser, zero author JS
import browser:lib/browser.mq.md
import table:lib/table.mq.md
import json:lib/json.mq.md
---

# main

**`theme_key` = "mq-theme"**
**`logo_dark` = "/static/logo.png"**
**`logo_light` = "/static/logo-light.png"**

`wire` =

| @ | 选择器 | 事件 | 调用 |
|---|--------|------|------|
| 1 | "#theme-toggle" | click | on_theme |
| 2 | "#nav-menu-toggle" | click | on_drawer |
| 3 | "#nav-drawer-veil" | click | close_drawer |
| 4 | "document" | keydown | on_key |
| 5 | "window" | scroll | on_scroll |
| 6 | "window" | resize | on_scroll |

`reveal_obs` =

| @ | kind | sel | id | then | threshold | rootMargin | once | add_class |
|---|------|-----|----|------|-----------|------------|------|-----------|
| 1 | intersect | ".article .article-body.md > h2, .article .article-body.md > h3, .article .article-body.md > blockquote, .article .article-body.md > pre" | reveal | | 0.12 | "0px 0px -8% 0px" | true | qd-in |

**`load` = > browser.store_get key=theme_key then="apply_theme" scope="local"**
**`ui` = > browser.fetch url="/api/ui" then="apply_ui"**
**`obs` = > browser.observe specs=reveal_obs**
**`w` = > table.put in=None at="wire" value=wire**
**`cls` = > table.put in=None at="body" value="is-ready"**
**`cls` = > table.put in=cls at=".article .article-body.md > h2, .article .article-body.md > h3, .article .article-body.md > blockquote, .article .article-body.md > pre" value="qd-reveal"**
**`dom` = > table.put in=None at="add_class" value=cls**
**`boot` = > browser.merge a=w b=load**
**`boot` = > browser.merge a=boot b=ui**
**`boot` = > browser.merge a=boot b=dom**
*> browser.merge a=boot b=obs*

## apply_ui
    + `ok`=False
    + `status`=0
    + `body`=""

1. `ok`
    **`data` = > json.parse text=body**
    **`rows` = [rows](data)**
    **`n` = > len value=rows**
    1. `n` > 0
        **`row` = [1](rows)**
        **`show_login` = [show_login](row)**
        **`show_register` = [show_register](row)**
        **`show_comment` = [show_comment](row)**
        **`icp_beian` = [icp_beian](row)**
        **`police_beian` = [police_beian](row)**
        **`hide_login` = False**
        **`hide_register` = False**
        **`hide_comment` = False**
        **`show_icp` = False**
        **`show_police` = False**
        1. `show_login` == 0
            **`hide_login` = True**
        2. `show_login` == "0"
            **`hide_login` = True**
        1. `show_register` == 0
            **`hide_register` = True**
        2. `show_register` == "0"
            **`hide_register` = True**
        1. `show_comment` == 0
            **`hide_comment` = True**
        2. `show_comment` == "0"
            **`hide_comment` = True**
        1. `icp_beian` != None
          1. `icp_beian` != ""
            **`show_icp` = True**
        1. `police_beian` != None
          1. `police_beian` != ""
            **`show_police` = True**
        **`body_cls` = ""**
        1. `hide_login`
            **`body_cls` = body_cls + "ui-hide-login "**
        1. `hide_register`
            **`body_cls` = body_cls + "ui-hide-register "**
        1. `hide_comment`
            **`body_cls` = body_cls + "ui-hide-comment "**
        **`texts` = None**
        **`rm` = None**
        1. `show_icp`
            **`texts` = > table.put in=texts at="li.foot-icp a" value=icp_beian**
            **`rm` = > table.put in=rm at="li.foot-icp" value="is-empty"**
        1. `show_police`
            **`texts` = > table.put in=texts at="li.foot-police a" value=police_beian**
            **`rm` = > table.put in=rm at="li.foot-police" value="is-empty"**
        **`ret` = None**
        1. `body_cls` != ""
            **`cls_map` = > table.put in=None at="body" value=body_cls**
            **`ret` = > table.put in=ret at="add_class" value=cls_map**
        1. `texts` != None
            **`ret` = > table.put in=ret at="set_text" value=texts**
        1. `rm` != None
            **`ret` = > table.put in=ret at="remove_class" value=rm**
        *ret*
    2. *
        *None*
2. *
    *None*

## apply_theme
    + `value`=""
    + `found`=False

1. `found`
    **`theme` = value**
2. *
    **`theme` = "dark"**
1. `theme` == "light"
    **`dark` = False**
    **`label` = "深色"**
    **`aria` = "切换到深色模式"**
    **`src` = logo_light**
2. *
    **`theme` = "dark"**
    **`dark` = True**
    **`label` = "浅色"**
    **`aria` = "切换到浅色模式"**
    **`src` = logo_dark**

**`html_attrs` = > table.put in=None at="data-theme" value=theme**
**`btn_attrs` = > table.put in=None at="aria-label" value=aria**
**`logo_attrs` = > table.put in=None at="src" value=src**
**`attrs` = > table.put in=None at="html" value=html_attrs**
**`attrs` = > table.put in=attrs at="#theme-toggle" value=btn_attrs**
**`attrs` = > table.put in=attrs at=".nav-brand-logo, .mq-img.brand-logo img" value=logo_attrs**
**`a` = > table.put in=None at="set_attr" value=attrs**
**`t` = > browser.set_text sel="#theme-toggle" text=label**
**`ret` = > browser.merge a=a b=t**
1. `dark`
    **`on` = > browser.add_class sel="#theme-toggle" class="on-dark"**
2. *
    **`on` = > browser.remove_class sel="#theme-toggle" class="on-dark"**
*> browser.merge a=ret b=on*

## on_theme
*> browser.store_get key=theme_key then="flip_theme" scope="local"*

## flip_theme
    + `value`=""
    + `found`=False

1. `found`
    1. `value` == "dark"
        **`next` = "light"**
    2. *
        **`next` = "dark"**
2. *
    **`next` = "light"**

*> browser.store_set key=theme_key value=next scope="local" then="theme_saved"*

## theme_saved
**`soft` = > browser.add_class sel="html" class="theme-switching"**
**`clear` = > browser.after ms=240 then="clear_switch"**
**`apply` = > browser.store_get key=theme_key then="apply_theme" scope="local"**
**`ret` = > browser.merge a=soft b=clear**
*> browser.merge a=ret b=apply*

## clear_switch
*> browser.remove_class sel="html" class="theme-switching"*

## on_drawer
*> browser.toggle_class sel="body" class="nav-open"*

## close_drawer
*> browser.remove_class sel="body" class="nav-open"*

## on_key
    + `key`=""

1. `key` == "Escape"
    *> browser.remove_class sel="body" class="nav-open"*

## on_scroll
    + `scroll_ratio`=0

**`pct` = scroll_ratio * 100**
**`width` = > str pct**
**`width` = width + "%"**
**`st` = > table.put in=None at="width" value=width**

*> browser.set_style sel="#qd-progress" style=st*
