---
title: site/site
description: >-
  Build all qdqc page bags (ADR 0007 stamps via kit). English API surface.
import web:ext/web/web.mq.md
import forms:ext/data/form.mq.md
import text:lib/text.mq.md
import kit:kit.mq.md
import theme:../styles/theme.mq.md
import motion:../styles/brand-motion.mq.md
import volumeStyle:../styles/volume.mq.md
import editorStyle:../styles/editor.mq.md
import admin:../components/admin.mq.md
import nav:../components/nav.mq.md
import side:../components/side.mq.md
import foot:../components/foot.mq.md
import intros:../components/intros.mq.md
---

Shared bind tables and forms for the journal site.

## post_list

`post_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | posts.title | |
| body | posts.summary | |
| meta | posts.created_at | |
| tag | posts.tag | |
| href | posts.slug | |
| pinned | posts.pinned | |

*`post_list`*

## news_rail

`news_rail` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | news.title | |
| meta | news.published_at | |
| tag | news.source | |
| href | news.url | |

*`news_rail`*

## post_detail

`post_detail` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | posts.title | |
| meta | posts.created_at | |
| tag | posts.tag | |
| body | posts.content | |

*`post_detail`*

## tag_list

`tag_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | tags.name | |
| meta | 点击查看该标签下的文章 | |
| href | tags.slug | |

*`tag_list`*

## column_list

`column_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | columns.name | |
| body | columns.summary | |
| meta | columns.status | |
| tag | columns.slug | |
| href | columns.slug | |

*`column_list`*

## news_list

`news_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | news.title | |
| body | news.summary | |
| meta | news.published_at | |
| tag | news.source | |
| href | news.url | |

*`news_list`*

## post_where

`post_where` =

| 字段 | 操作 | 值 |
|------|------|-----|
| slug | = | {slug} |

*`post_where`*

## comment_where

`comment_where` =

| 字段 | 操作 | 值 |
|------|------|-----|
| post_slug | = | {slug} |

*`comment_where`*

## comment_cards

`comment_cards` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | comments.author | |
| body | comments.body | |
| meta | comments.created_at | |

*`comment_cards`*

## tag_where

`tag_where` =

| 字段 | 操作 | 值 |
|------|------|-----|
| tag | = | {slug} |

*`tag_where`*

## column_where

`column_where` =

| 字段 | 操作 | 值 |
|------|------|-----|
| column_slug | = | {slug} |

*`column_where`*

## brand_images

`brand_images` =

| 源 | 替代 | 类 | 链接 | 宽度 | 加载 |
|----|------|----|------|------|------|
| "/static/logo.png" | 求道量子 | brand-logo | "/" | 96 | eager |

*`brand_images`*

## article_assets

`article_assets` =

| 关系 | 地址 | 推迟 | 版本 |
|------|------|------|------|
| stylesheet | "/static/katex/katex.min.css" | | |
| script | "/static/katex/katex.min.js" | true | |
| script | "/static/katex/auto-render.min.js" | true | |

*`article_assets`*

## publish_fields

`publish_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| title | 标题 | text | true | |
| slug | 链接标识 | text | false | |
| tag | 标签 | text | false | |
| column_slug | 专栏 | text | false | |
| pinned | 置顶 | text | false | 0 |
| summary | 摘要 | textarea | false | |
| content | 正文 | markdown | true | |

*`publish_fields`*

## edit_fields

`edit_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 文章编号 | hidden | true | |
| title | 标题 | text | true | |
| slug | 链接标识 | text | false | |
| tag | 标签 | text | false | |
| column_slug | 专栏 | text | false | |
| pinned | 置顶 | text | false | 0 |
| summary | 摘要 | textarea | false | |
| content | 正文 | markdown | true | |

*`edit_fields`*

## publish_rules

`publish_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| title | required | 请填写标题 |
| title | max:200 | 标题请控制在 200 字以内 |
| slug | max:80 | 链接标识最长 80 字符 |
| tag | max:32 | 标签最长 32 字符 |
| column_slug | max:64 | 专栏标识最长 64 字符 |
| content | required | 请填写正文 |

*`publish_rules`*

## edit_rules

`edit_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少文章编号 |
| title | required | 请填写标题 |
| title | max:200 | 标题请控制在 200 字以内 |
| slug | max:80 | 链接标识最长 80 字符 |
| tag | max:32 | 标签最长 32 字符 |
| column_slug | max:64 | 专栏标识最长 64 字符 |
| content | required | 请填写正文 |

*`edit_rules`*

## admin_post_list

`admin_post_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | posts.title | |
| body | posts.summary | |
| meta | posts.updated_at | |
| tag | posts.tag | |
| href | posts.id | |

*`admin_post_list`*

## admin_column_list

`admin_column_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | columns.name | |
| body | columns.summary | |
| meta | columns.status | |
| tag | columns.slug | |
| href | columns.id | |

*`admin_column_list`*

## admin_news_list

`admin_news_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | news.title | |
| body | news.summary | |
| meta | news.published_at | |
| tag | news.source | |
| href | news.id | |

*`admin_news_list`*

## admin_comment_list

`admin_comment_list` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | comments.author | |
| body | comments.body | |
| meta | comments.created_at | |
| tag | comments.post_slug | |
| href | comments.id | |

*`admin_comment_list`*

## comment_admin_fields

`comment_admin_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 编号 | hidden | true | |
| post_slug | 文章标识 | text | true | |
| author | 作者 | text | true | |
| body | 正文 | textarea | true | |
| created_at | 时间 | text | false | |

*`comment_admin_fields`*

## comment_admin_rules

`comment_admin_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少评论编号 |
| body | required | 请填写评论 |
| body | max:2000 | 评论请控制在 2000 字以内 |

*`comment_admin_rules`*

## comment_delete_fields

`comment_delete_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 编号 | hidden | true | |
| post_slug | 文章 | text | false | |
| author | 作者 | text | false | |
| body | 内容 | textarea | false | |
| created_at | 时间 | text | false | |

*`comment_delete_fields`*

## column_fields

`column_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| name | 名称 | text | true | |
| slug | 链接标识 | text | true | |
| summary | 摘要 | textarea | false | |
| sort_order | 排序 | text | false | 0 |
| status | 状态 | text | false | ongoing |
| created_at | 创建时间 | text | false | |

*`column_fields`*

## column_edit_fields

`column_edit_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 编号 | hidden | true | |
| name | 名称 | text | true | |
| slug | 链接标识 | text | true | |
| summary | 摘要 | textarea | false | |
| sort_order | 排序 | text | false | |
| status | 状态 | text | false | |
| created_at | 创建时间 | text | false | |

*`column_edit_fields`*

## news_fields

`news_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 | 来源 |
|------|------|------|------|------|------|
| title | 标题 | text | true | | |
| url | 原文链接 | text | true | | |
| source | 来源 | text | false | | |
| summary | 摘要 | textarea | false | | |
| published_at | 发布日期 | text | false | | 空则现在 |
| created_at | 入库时间 | text | false | | 空则现在 |

*`news_fields`*

## news_edit_fields

`news_edit_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 | 来源 |
|------|------|------|------|------|------|
| id | 编号 | hidden | true | | |
| title | 标题 | text | true | | |
| url | 原文链接 | text | true | | |
| source | 来源 | text | false | | |
| summary | 摘要 | textarea | false | | |
| published_at | 发布日期 | text | false | | 空则现在 |
| created_at | 入库时间 | text | false | |

*`news_edit_fields`*

## column_rules

`column_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| name | required | 请填写专栏名称 |
| name | max:120 | 名称最长 120 字符 |
| slug | required | 请填写 slug |
| slug | max:64 | slug 最长 64 字符 |
| summary | max:500 | 摘要最长 500 字符 |

*`column_rules`*

## column_edit_rules

`column_edit_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少专栏编号 |
| name | required | 请填写专栏名称 |
| slug | required | 请填写 slug |
| slug | max:64 | slug 最长 64 字符 |

*`column_edit_rules`*

## news_rules

`news_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| title | required | 请填写标题 |
| title | max:200 | 标题最长 200 字符 |
| url | required | 请填写原文链接 |
| url | max:500 | 链接最长 500 字符 |
| source | max:64 | 来源最长 64 字符 |

*`news_rules`*

## news_edit_rules

`news_edit_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少新闻编号 |
| title | required | 请填写标题 |
| url | required | 请填写原文链接 |

*`news_edit_rules`*

## comment_fields

`comment_fields` =

| 字段 | 标签 | 类型 | 必填 | 默认 | 来源 |
|------|------|------|------|------|------|
| body | 写下回信 | textarea | true | | client |
| author | | text | true | | session.username |
| post_slug | | text | true | | route.slug |
| created_at | | text | false | | now |

*`comment_fields`*

## comment_rules

`comment_rules` =

| 字段 | 规则 | 消息 |
|------|------|------|
| body | required | 请填写评论 |
| body | max:2000 | 评论请控制在 2000 字以内 |
| author | required | 请先登录后再评论 |
| post_slug | required | 缺少文章标识 |

*`comment_rules`*

## json_routes

`json_routes` =

| 路径 | 方法 | 表 | 条件 | 排序 | 上限 |
|------|------|----|------|------|------|
| api/posts | GET | posts | | "-pinned,-updated_at" | 500 |
| api/columns | GET | columns | | sort_order | 50 |
| api/news | GET | news | | "-published_at" | 40 |

*`json_routes`*

## icons_table

`icons_table` =

| 路径 | 关系 | 类型 | 尺寸 | 地址 |
|------|------|------|------|------|
| "public/favicon.ico" | icon | "image/x-icon" | any | "/favicon.ico" |
| "public/favicon.svg" | icon | "image/svg+xml" | any | "/icons/favicon.svg" |
| "public/logo.png" | icon | "image/png" | any | "/icons/logo.png" |

*`icons_table`*

## icons

*> icons_table*

## public_css

**theme_css = > theme.css**
**motion_css = > motion.css**
**volume_css = > volumeStyle.css**
`parts` =

| css |
|-----|
| `theme_css` |
| `motion_css` |
| `volume_css` |

*> text.str_join xs=`parts` sep=""*

## desk_css

**theme_css = > theme.css**
**motion_css = > motion.css**
**volume_css = > volumeStyle.css**
**editor_css = > editorStyle.css**
`parts` =

| css |
|-----|
| `theme_css` |
| `motion_css` |
| `volume_css` |
| `editor_css` |

*> text.str_join xs=`parts` sep=""*

## make_forms

Build all form handles used by pages and app.mount_form.

**cf = > comment_fields**
**cr = > comment_rules**
**caf = > comment_admin_fields**
**car = > comment_admin_rules**
**cdf = > comment_delete_fields**
**pf = > publish_fields**
**pr = > publish_rules**
**ef = > edit_fields**
**er = > edit_rules**
**colf = > column_fields**
**colr = > column_rules**
**colef = > column_edit_fields**
**coler = > column_edit_rules**
**nf = > news_fields**
**nr = > news_rules**
**nef = > news_edit_fields**
**ner = > news_edit_rules**

**comment_form = > forms.form table="comments" action="insert"**
**comment_form = > `comment_form`.fields fields=cf**
**comment_form = > `comment_form`.rules rules=cr**
**comment_form = > `comment_form`.labels submit="投递" cancel=" " cancel_href="#"**

**comment_edit_form = > forms.form table="comments" action="update"**
**comment_edit_form = > `comment_edit_form`.fields fields=caf**
**comment_edit_form = > `comment_edit_form`.rules rules=car**
**comment_edit_form = > `comment_edit_form`.labels submit="保存评论" cancel="返回列表" cancel_href="/admin/comments"**

**comment_delete_form = > forms.form table="comments" action="delete"**
**comment_delete_form = > `comment_delete_form`.fields fields=cdf**
**comment_delete_form = > `comment_delete_form`.labels submit="删除这条评论" cancel="返回列表" cancel_href="/admin/comments"**

**post_form = > forms.form table="posts" action="insert"**
**post_form = > `post_form`.fields fields=pf**
**post_form = > `post_form`.rules rules=pr**
**post_form = > `post_form`.labels submit="发布文章" cancel="返回列表" cancel_href="/admin/posts"**

**edit_form = > forms.form table="posts" action="update"**
**edit_form = > `edit_form`.fields fields=ef**
**edit_form = > `edit_form`.rules rules=er**
**edit_form = > `edit_form`.labels submit="保存文章" cancel="返回列表" cancel_href="/admin/posts"**

**column_form = > forms.form table="columns" action="insert"**
**column_form = > `column_form`.fields fields=colf**
**column_form = > `column_form`.rules rules=colr**
**column_form = > `column_form`.labels submit="创建专栏" cancel="返回列表" cancel_href="/admin/columns"**

**column_edit_form = > forms.form table="columns" action="update"**
**column_edit_form = > `column_edit_form`.fields fields=colef**
**column_edit_form = > `column_edit_form`.rules rules=coler**
**column_edit_form = > `column_edit_form`.labels submit="保存专栏" cancel="返回列表" cancel_href="/admin/columns"**

**news_form = > forms.form table="news" action="insert"**
**news_form = > `news_form`.fields fields=nf**
**news_form = > `news_form`.rules rules=nr**
**news_form = > `news_form`.labels submit="发布快讯" cancel="返回列表" cancel_href="/admin/news"**

**news_edit_form = > forms.form table="news" action="update"**
**news_edit_form = > `news_edit_form`.fields fields=nef**
**news_edit_form = > `news_edit_form`.rules rules=ner**
**news_edit_form = > `news_edit_form`.labels submit="保存快讯" cancel="返回列表" cancel_href="/admin/news"**

`out` =

| comment_form | comment_edit_form | comment_delete_form | post_form | edit_form | column_form | column_edit_form | news_form | news_edit_form |
|--------------|-------------------|---------------------|-----------|-----------|-------------|------------------|-----------|----------------|
| `comment_form` | `comment_edit_form` | `comment_delete_form` | `post_form` | `edit_form` | `column_form` | `column_edit_form` | `news_form` | `news_edit_form` |

*out*

## public_page
    + `title`
    + `intro`=""
    + `css`
    + `with_side`=True

**n = > nav.导航**
**s = > side.侧栏**
**f = > foot.页脚**
**page = > web.page title=`title`**
1. `with_side`
  **page = > kit.shell page=`page` nav=n side=s foot=f css=`css` intro=`intro`**
2. *
  **page = > kit.shell page=`page` nav=n foot=f css=`css` intro=`intro`**
*page*

## desk_page
    + `title`
    + `intro`=""
    + `css`
    + `body_class`="desk-admin"

**n = > nav.导航**
**af = > admin.后台页脚**
**page = > web.page title=`title`**
**page = > kit.shell page=`page` nav=n foot=af css=`css` intro=`intro`**
**page = > kit.set_chrome page=`page` body_class=`body_class`**
*page*

## home
    + `css`

**pl = > post_list**
**nr = > news_rail**
**bi = > brand_images**
**intro = > intros.首页引言**
**page = > public_page title="求道量子" intro=`intro` css=`css`**
**page = > kit.bind_main page=`page` binds=pl**
**page = > kit.set_order page=`page` order="-pinned,-created_at"**
**page = > kit.bind_list page=`page` binds=nr order="-published_at" target="rail"**
**page = > kit.page_images page=`page` table=bi**
*page*

## about
    + `css`

**nr = > news_rail**
**intro = > intros.关于引言**
**page = > public_page title="关于" intro=`intro` css=`css`**
**page = > kit.bind_list page=`page` binds=nr order="-published_at" target="rail"**
*page*

## post
    + `css`
    + `comment_form`

**pd = > post_detail**
**pw = > post_where**
**cc = > comment_cards**
**cw = > comment_where**
**nr = > news_rail**
**aa = > article_assets**
**intro = > intros.文章引言**
**page = > public_page title="文章" intro=`intro` css=`css`**
**page = > kit.bind_main page=`page` binds=pd**
**page = > kit.set_query page=`page` query=pw**
**page = > kit.set_detail page=`page` detail=True**
**page = > kit.bind_list page=`page` binds=cc query=cw order="-created_at" target="#comment-list"**
**page = > kit.bind_list page=`page` binds=nr order="-published_at" target="rail"**
**page = > kit.bind_form page=`page` form=`comment_form` id="comment" target="#comment-form-mount"**
**page = > kit.page_head page=`page` table=aa**
*page*

## tags
    + `css`

**tl = > tag_list**
**nr = > news_rail**
**intro = > intros.标签引言**
**page = > public_page title="标签归档" intro=`intro` css=`css`**
**page = > kit.bind_main page=`page` binds=tl**
**page = > kit.set_link_prefix page=`page` prefix="/tag/"**
**page = > kit.bind_list page=`page` binds=nr order="-published_at" target="rail"**
*page*

## tagged
    + `css`

**pl = > post_list**
**tw = > tag_where**
**nr = > news_rail**
**page = > public_page title="标签" css=`css`**
**page = > kit.bind_main page=`page` binds=pl**
**page = > kit.set_query page=`page` query=tw**
**page = > kit.set_order page=`page` order="-pinned,-created_at"**
**page = > kit.bind_list page=`page` binds=nr order="-published_at" target="rail"**
*page*

## columns
    + `css`

**cl = > column_list**
**nr = > news_rail**
**intro = > intros.专栏书架引言**
**page = > public_page title="专栏书架" intro=`intro` css=`css`**
**page = > kit.bind_main page=`page` binds=cl**
**page = > kit.set_order page=`page` order="sort_order"**
**page = > kit.set_link_prefix page=`page` prefix="/column/"**
**page = > kit.bind_list page=`page` binds=nr order="-published_at" target="rail"**
*page*

## news
    + `css`

**nl = > news_list**
**intro = > intros.新闻引言**
**page = > public_page title="量子新闻" intro=`intro` css=`css`**
**page = > kit.bind_main page=`page` binds=nl**
**page = > kit.set_order page=`page` order="-published_at"**
*page*

## column
    + `css`

**pl = > post_list**
**colw = > column_where**
**nr = > news_rail**
**intro = > intros.开卷引言**
**page = > public_page title="开卷" intro=`intro` css=`css`**
**page = > kit.bind_main page=`page` binds=pl**
**page = > kit.set_query page=`page` query=colw**
**page = > kit.set_order page=`page` order="created_at"**
**page = > kit.bind_list page=`page` binds=nr order="-published_at" target="rail"**
*page*

## login
    + `css`

**intro = > intros.登录引言**
**page = > public_page title="登录" intro=`intro` css=`css`**
**page = > kit.set_chrome page=`page` body_class="auth-page"**
*page*

## register
    + `css`

**intro = > intros.注册引言**
**page = > public_page title="注册" intro=`intro` css=`css`**
**page = > kit.set_chrome page=`page` body_class="auth-page"**
*page*

## desk_login
    + `css`

**intro = > intros.后台登录引言**
**page = > web.page title="后台登录"**
**page = > kit.shell page=`page` css=`css` intro=`intro`**
**page = > kit.set_chrome page=`page` body_class="desk-login"**
*page*

## desk_hub
    + `css`

**intro = > intros.后台概览引言**
*> desk_page title="后台管理" intro=`intro` css=`css` body_class="desk-admin"*

## publish
    + `css`

**apl = > admin_post_list**
**intro = > intros.文章管理引言**
**page = > desk_page title="文章管理" intro=`intro` css=`css` body_class="desk-admin desk-list"**
**page = > kit.bind_main page=`page` binds=apl**
**page = > kit.set_order page=`page` order="-updated_at"**
**page = > kit.set_link_prefix page=`page` prefix="/admin/posts/"**
*page*

## publish_new
    + `css`
    + `post_form`

**intro = > intros.撰写新稿引言**
**page = > desk_page title="撰写新稿" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`post_form` id="post"**
*page*

## publish_edit
    + `css`
    + `edit_form`

**intro = > intros.编辑文章引言**
**page = > desk_page title="编辑文章" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`edit_form` id="post-edit"**
**page = > kit.form_load page=`page` tbl="posts"**
*page*

## admin_columns
    + `css`

**acl = > admin_column_list**
**intro = > intros.专栏管理引言**
**page = > desk_page title="专栏管理" intro=`intro` css=`css` body_class="desk-admin desk-list"**
**page = > kit.bind_main page=`page` binds=acl**
**page = > kit.set_order page=`page` order="sort_order"**
**page = > kit.set_link_prefix page=`page` prefix="/admin/columns/"**
*page*

## admin_columns_new
    + `css`
    + `column_form`

**intro = > intros.新建专栏引言**
**page = > desk_page title="新建专栏" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`column_form` id="column"**
*page*

## admin_columns_edit
    + `css`
    + `column_edit_form`

**intro = > intros.编辑专栏引言**
**page = > desk_page title="编辑专栏" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`column_edit_form` id="column-edit"**
**page = > kit.form_load page=`page` tbl="columns"**
*page*

## admin_news
    + `css`

**anl = > admin_news_list**
**intro = > intros.新闻管理引言**
**page = > desk_page title="新闻管理" intro=`intro` css=`css` body_class="desk-admin desk-list"**
**page = > kit.bind_main page=`page` binds=anl**
**page = > kit.set_order page=`page` order="-published_at"**
**page = > kit.set_link_prefix page=`page` prefix="/admin/news/"**
*page*

## admin_news_new
    + `css`
    + `news_form`

**intro = > intros.新建快讯引言**
**page = > desk_page title="新建快讯" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`news_form` id="news"**
*page*

## admin_news_edit
    + `css`
    + `news_edit_form`

**intro = > intros.编辑快讯引言**
**page = > desk_page title="编辑快讯" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`news_edit_form` id="news-edit"**
**page = > kit.form_load page=`page` tbl="news"**
*page*

## admin_comments
    + `css`

**acm = > admin_comment_list**
**intro = > intros.评论管理引言**
**page = > desk_page title="评论管理" intro=`intro` css=`css` body_class="desk-admin desk-list"**
**page = > kit.bind_main page=`page` binds=acm**
**page = > kit.set_order page=`page` order="-created_at"**
**page = > kit.set_link_prefix page=`page` prefix="/admin/comments/"**
*page*

## admin_comments_edit
    + `css`
    + `comment_edit_form`

**intro = > intros.编辑评论引言**
**page = > desk_page title="编辑评论" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`comment_edit_form` id="comment-edit"**
**page = > kit.form_load page=`page` tbl="comments"**
*page*

## admin_comments_delete
    + `css`
    + `comment_delete_form`

**intro = > intros.删除评论引言**
**page = > desk_page title="删除评论" intro=`intro` css=`css` body_class="desk-admin desk-writing"**
**page = > kit.bind_form page=`page` form=`comment_delete_form` id="comment-delete"**
**page = > kit.form_load page=`page` tbl="comments"**
*page*
