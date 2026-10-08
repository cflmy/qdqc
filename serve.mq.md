---
title: qdqc serve
description: >-
  求道量子 entry — web.app + declared routes (ADR 0007). Does not use web.serve
  scan so advanced shell / forms / OIDC / gates stay intact.
import web:ext/web/web.mq.md
import sys:lib/sys.mq.md
import kit:site/kit.mq.md
import site:site/site.mq.md
import db:db/index.mq.md
---

# main

**store = > db.open**
**session_url = > db.session_url**
**css = > site.public_css**
**desk_css = > site.desk_css**
**forms = > site.make_forms**

**page = > site.home css=`css`**
**about = > site.about css=`css`**
**post = > site.post css=`css` comment_form=[comment_form](forms)**
**tags = > site.tags css=`css`**
**tagged = > site.tagged css=`css`**
**columns = > site.columns css=`css`**
**news = > site.news css=`css`**
**column = > site.column css=`css`**
**login = > site.login css=`css`**
**register = > site.register css=`css`**
**desk_login = > site.desk_login css=`desk_css`**
**desk_hub = > site.desk_hub css=`desk_css`**
**publish = > site.publish css=`desk_css`**
**publish_new = > site.publish_new css=`desk_css` post_form=[post_form](forms)**
**publish_edit = > site.publish_edit css=`desk_css` edit_form=[edit_form](forms)**
**admin_columns = > site.admin_columns css=`desk_css`**
**admin_columns_new = > site.admin_columns_new css=`desk_css` column_form=[column_form](forms)**
**admin_columns_edit = > site.admin_columns_edit css=`desk_css` column_edit_form=[column_edit_form](forms)**
**admin_news = > site.admin_news css=`desk_css`**
**admin_news_new = > site.admin_news_new css=`desk_css` news_form=[news_form](forms)**
**admin_news_edit = > site.admin_news_edit css=`desk_css` news_edit_form=[news_edit_form](forms)**
**admin_comments = > site.admin_comments css=`desk_css`**
**admin_comments_edit = > site.admin_comments_edit css=`desk_css` comment_edit_form=[comment_edit_form](forms)**
**admin_comments_delete = > site.admin_comments_delete css=`desk_css` comment_delete_form=[comment_delete_form](forms)**
**admin_settings = > site.admin_settings css=`desk_css` ui_form=[ui_form](forms)**

**app = > web.app page=`page` db=`store` admin=False host="0.0.0.0" port=18085 shell_css="minimal" asset_version="20261008a"**
**app = > web.route app=`app` path="/about" page=`about`**
**app = > web.route app=`app` path="/post/{slug}" page=`post`**
**app = > web.route app=`app` path="/tags" page=`tags`**
**app = > web.route app=`app` path="/tag/{slug}" page=`tagged`**
**app = > web.route app=`app` path="/columns" page=`columns`**
**app = > web.route app=`app` path="/column/{slug}" page=`column`**
**app = > web.route app=`app` path="/news" page=`news`**
**app = > web.route app=`app` path="/login" page=`login`**
**app = > web.route app=`app` path="/register" page=`register`**
**app = > web.route app=`app` path="/admin/login" page=`desk_login`**
**app = > web.route app=`app` path="/admin" page=`desk_hub`**
**app = > web.route app=`app` path="/admin/posts" page=`publish`**
**app = > web.route app=`app` path="/admin/posts/new" page=`publish_new`**
**app = > web.route app=`app` path="/admin/posts/{id}" page=`publish_edit`**
**app = > web.route app=`app` path="/admin/columns" page=`admin_columns`**
**app = > web.route app=`app` path="/admin/columns/new" page=`admin_columns_new`**
**app = > web.route app=`app` path="/admin/columns/{id}" page=`admin_columns_edit`**
**app = > web.route app=`app` path="/admin/news" page=`admin_news`**
**app = > web.route app=`app` path="/admin/news/new" page=`admin_news_new`**
**app = > web.route app=`app` path="/admin/news/{id}" page=`admin_news_edit`**
**app = > web.route app=`app` path="/admin/comments" page=`admin_comments`**
**app = > web.route app=`app` path="/admin/comments/delete/{id}" page=`admin_comments_delete`**
**app = > web.route app=`app` path="/admin/comments/{id}" page=`admin_comments_edit`**
**app = > web.route app=`app` path="/admin/settings/{id}" page=`admin_settings`**

**app = > kit.redirect app=`app` from="/admin-publish" to="/admin/posts" permanent=True**
**app = > kit.redirect app=`app` from="/admin-edit" to="/admin/posts" permanent=True**
**app = > kit.redirect app=`app` from="/desk" to="/admin" permanent=True**
**app = > kit.redirect app=`app` from="/desk/login" to="/admin/login" permanent=True**
**app = > kit.redirect app=`app` from="/desk/posts" to="/admin/posts" permanent=True**
**app = > kit.redirect app=`app` from="/desk/columns" to="/admin/columns" permanent=True**
**app = > kit.redirect app=`app` from="/desk/news" to="/admin/news" permanent=True**
**app = > kit.redirect app=`app` from="/_auth/login" to="/admin/login" permanent=True**
**app = > kit.redirect app=`app` from="/_auth/logout" to="/admin/logout" permanent=True**
**app = > kit.redirect app=`app` from="/admin/settings" to="/admin/settings/1" permanent=True**

**app = > kit.mount_form app=`app` id="post-edit" form=[edit_form](forms)**
**app = > kit.mount_form app=`app` id="column-edit" form=[column_edit_form](forms)**
**app = > kit.mount_form app=`app` id="news-edit" form=[news_edit_form](forms)**
**app = > kit.mount_form app=`app` id="comment" form=[comment_form](forms)**
**app = > kit.mount_form app=`app` id="comment-edit" form=[comment_edit_form](forms)**
**app = > kit.mount_form app=`app` id="comment-delete" form=[comment_delete_form](forms)**
**app = > kit.mount_form app=`app` id="post" form=[post_form](forms)**
**app = > kit.mount_form app=`app` id="column" form=[column_form](forms)**
**app = > kit.mount_form app=`app` id="news" form=[news_form](forms)**
**app = > kit.mount_form app=`app` id="ui" form=[ui_form](forms)**

**api_routes = > site.json_routes**
**app = > kit.json_api app=`app` routes=api_routes**

**app = > `app`.static dir="public" mount="/static"**
**icons_tbl = > site.icons**
**app = > kit.icons app=`app` table=icons_tbl**
**app = > kit.enable_rbac app=`app`**
**app = > kit.auth app=`app` users=None session_ttl=3600 login_path="/login" login_redirect="/" logout_redirect="/" register=True register_path="/register" default_role="member" session_url=`session_url`**

**oidc_issuer = > sys.env_get name="QDQC_OIDC_ISSUER"**
**oidc_client = > sys.env_get name="QDQC_OIDC_CLIENT_ID"**
**oidc_secret = > sys.env_get name="QDQC_OIDC_CLIENT_SECRET"**
**oidc_redirect = > sys.env_get name="QDQC_OIDC_REDIRECT_URI"**
**oidc_origins = > sys.env_get name="QDQC_OIDC_REDIRECT_ORIGINS"**
1. oidc_client
  **app = > kit.attach_oidc app=`app` issuer=oidc_issuer client_id=oidc_client client_secret=oidc_secret redirect_uri=oidc_redirect redirect_origins=oidc_origins**

**app = > `app`.gate path="/admin" roles="" permissions="desk:access" match="prefix" on_deny="redirect" exclude="/admin/login,/login,/register,/oidc/callback,/oidc/login,/oidc/register"**
**app = > `app`.gate path="/_form/post" roles="" permissions="posts:edit" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/post-edit" roles="" permissions="posts:edit" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/column" roles="" permissions="desk:access" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/column-edit" roles="" permissions="desk:access" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/news" roles="" permissions="desk:access" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/news-edit" roles="" permissions="desk:access" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/comment" roles="" permissions="comments:create" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/comment-edit" roles="" permissions="desk:access" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/comment-delete" roles="" permissions="comments:delete" match="exact" on_deny="redirect"**
**app = > `app`.gate path="/_form/ui" roles="" permissions="desk:access" match="exact" on_deny="redirect"**

> `app`.listen
