---
title: site/kit
description: >-
  Page-bag stamps for qdqc (ADR 0007). Named effects via table.put — never
  compose_* / configure. Render consumes main/lists/nav/sidebar/footer/intro/form/client.
import web:ext/web/web.mq.md
import table:lib/table.mq.md
import oidc:ext/security/oidc.mq.md
---

Stamp helpers. Importing `web` loads the native plugin (capability).

## bind_shell
    + `page`
    + `nav`=None
    + `side`=None
    + `foot`=None

Put nav / sidebar / footer link tables on the page bag.

**p = page**
1. `nav`
  **p = > table.put in=p at="nav" value=nav**
2. *
  **_ = 1**
1. `side`
  **p = > table.put in=p at="sidebar" value=side**
2. *
  **_ = 1**
1. `foot`
  **p = > table.put in=p at="footer" value=foot**
2. *
  **_ = 1**
*p*

## bind_main
    + `page`
    + `binds`

Primary list/detail bind table (`|属性|值|样式|` or front/back/style).

*> table.put in=`page` at="main" value=binds*

## bind_list
    + `page`
    + `binds`
    + `order`=""
    + `target`=""
    + `query`=None

Append a secondary list (news rail, comments, …). Page must already have `lists` (see shell).

`entry` =

| main | order | target | query |
|------|-------|--------|-------|
| `binds` | `order` | `target` | `query` |

**prev = [lists](page)**
**lists = > table.append list=prev item=entry**
*> table.put in=`page` at="lists" value=lists*

## set_intro
    + `page`
    + `html`

Intro is pre-rendered HTML (masthead / kicker / letters block).

*> table.put in=`page` at="intro" value=html*

## set_css
    + `page`
    + `css`

*> web_page_css page=`page` css=`css`*

## set_query
    + `page`
    + `query`

*> web_page_query page=`page` query=`query`*

## set_order
    + `page`
    + `order`

*> web_page_order page=`page` order=`order`*

## set_detail
    + `page`
    + `detail`=True

*> web_page_detail page=`page` detail=`detail`*

## set_link_prefix
    + `page`
    + `prefix`

*> web_page_link_prefix page=`page` prefix=`prefix`*

## set_chrome
    + `page`
    + `body_class`=""
    + `nav_html`=""
    + `footer_html`=""

*> web_page_chrome page=`page` nav_html=`nav_html` footer_html=`footer_html` body_class=`body_class`*

## brand_nav
    + `page`
    + `title`="求道量子"
    + `href`="/"
    + `logo`="/static/logo.png"
    + `logo_light`="/static/logo-light.png"
    + `theme_key`="mq-theme"

SSR topnav lockup (logo + title + theme toggle chrome).

`spec` =

| title | href | logo | logo_light | theme_key |
|-------|------|------|------------|-----------|
| `title` | `href` | `logo` | `logo_light` | `theme_key` |

*> table.put in=`page` at="nav_brand" value=spec*

## embed_client
    + `page`
    + `source`="/static/client.mq.md"
    + `bridge`="/static/marqdo-bridge.js"
    + `wasm`="/static/marqdo_wasm.wasm"

`spec` =

| bridge | wasm | source |
|--------|------|--------|
| `bridge` | `wasm` | `source` |

*> table.put in=`page` at="client" value=spec*

## bind_form
    + `page`
    + `form`
    + `id`
    + `target`=""

**p = > table.put in=page at="form" value=form**
**p = > table.put in=p at="form_id" value=id**
1. `target`
  **p = > table.put in=p at="form_target" value=target**
2. *
  **_ = 1**
*p*

## form_load
    + `page`
    + `tbl`
    + `id_param`="id"

`spec` =

| table | id_param |
|-------|----------|
| `tbl` | `id_param` |

*> table.put in=`page` at="form_load" value=spec*

## page_images
    + `page`
    + `table`

*> web_page_images page=`page` table=`table`*

## page_head
    + `page`
    + `table`

*> web_page_head page=`page` table=`table`*

## shell
    + `page`
    + `nav`=None
    + `side`=None
    + `foot`=None
    + `css`=""
    + `intro`=""

Common public/desk shell: brand + client + optional chrome slots + CSS + intro.

`empty_lists` =

| x |
|---|

**p = > brand_nav page=`page`**
**p = > embed_client page=`p`**
**p = > bind_shell page=`p` nav=`nav` side=`side` foot=`foot`**
**p = > table.put in=p at="lists" value=empty_lists**
1. `css`
  **p = > set_css page=`p` css=`css`**
2. *
  **_ = 1**
1. `intro`
  **p = > set_intro page=`p` html=`intro`**
2. *
  **_ = 1**
*p*

## mount_form
    + `app`
    + `id`
    + `form`

*> web_app_mount_form app=`app` id=`id` form=`form`*

## redirect
    + `app`
    + `from`
    + `to`
    + `permanent`=True

*> web_app_redirect app=`app` from=`from` to=`to` permanent=`permanent`*

## icons
    + `app`
    + `table`

*> web_app_icons app=`app` table=`table`*

## auth
    + `app`
    + `users`=None
    + `session_ttl`=3600
    + `login_path`="/login"
    + `login_redirect`="/"
    + `logout_redirect`="/"
    + `register`=True
    + `register_path`="/register"
    + `default_role`="member"
    + `session_url`=None
    + `admin_prefix`="/admin"

*> web_app_auth app=`app` users=`users` session_ttl=`session_ttl` admin_prefix=`admin_prefix` login_path=`login_path` login_redirect=`login_redirect` logout_redirect=`logout_redirect` register=`register` register_path=`register_path` default_role=`default_role` session_url=`session_url`*

## enable_rbac
    + `app`

*> web_app_rbac app=`app` catalog=None desk=False*

## attach_oidc
    + `app`
    + `issuer`=None
    + `client_id`
    + `client_secret`
    + `redirect_uri`
    + `redirect_origins`=None

*> oidc.attach app=`app` issuer=`issuer` client_id=`client_id` client_secret=`client_secret` redirect_uri=`redirect_uri` redirect_origins=`redirect_origins`*

## json_api
    + `app`
    + `routes`

Register table-driven JSON API routes (path/method/table/order/limit).

*> web_app_middleware app=`app` cors=None security=None compress=None body_limit=None json_routes=`routes` access_log=None cache_control=None proxy=None invoke=None*

## artifact_endpoints
    + `app`

Register qdqc JSON API Endpoint files on `artifact_routes`.

`posts` =

| method | path | file | request | response | auth | kind |
|--------|------|------|---------|----------|------|------|
| GET | /api/posts | api/posts.mq.md | none | json | none | endpoint |

`columns` =

| method | path | file | request | response | auth | kind |
|--------|------|------|---------|----------|------|------|
| GET | /api/columns | api/columns.mq.md | none | json | none | endpoint |

`news` =

| method | path | file | request | response | auth | kind |
|--------|------|------|---------|----------|------|------|
| GET | /api/news | api/news.mq.md | none | json | none | endpoint |

**routes = > table.put in=None at="GET /api/posts" value=posts**
**routes = > table.put in=routes at="GET /api/columns" value=columns**
**routes = > table.put in=routes at="GET /api/news" value=news**
*> table.put in=`app` at="artifact_routes" value=routes*
