---
title: 求道量子
description: 求道量子，以求道之心，探量子之密。
导入 网页:ext/web/网页.mq.md
导入 系统:lib/系统.mq.md
import theme:styles/theme.mq.md
import motion:styles/brand-motion.mq.md
import volumeStyle:styles/volume.mq.md
import editorStyle:styles/editor.mq.md
import text:lib/text.mq.md
import admin:components/admin.mq.md
import nav:components/nav.mq.md
import side:components/side.mq.md
import foot:components/foot.mq.md
import intros:components/intros.mq.md
import db:db/index.mq.md
---

# main

`首页` =

| 组件 | 样式 |
|------|------|
| nav.`导航` | |
| side.`侧栏` | |
| foot.`页脚` | |

`列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | posts.title | |
| body | posts.summary | |
| meta | posts.created_at | |
| tag | posts.tag | |
| href | posts.slug | |
| pinned | posts.pinned | |

`新闻轨列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | news.title | |
| meta | news.published_at | |
| tag | news.source | |
| href | news.url | |

`详情绑定` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | posts.title | |
| meta | posts.created_at | |
| tag | posts.tag | |
| body | posts.content | |

`标签列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | tags.name | |
| meta | 点击查看该标签下的文章 | |
| href | tags.slug | |

`专栏列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | columns.name | |
| body | columns.summary | |
| meta | columns.status | |
| tag | columns.slug | |
| href | columns.slug | |

`新闻列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | news.title | |
| body | news.summary | |
| meta | news.published_at | |
| tag | news.source | |
| href | news.url | |

`文章条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| slug | = | {slug} |

`评论条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| post_slug | = | {slug} |

`评论卡片` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | comments.author | |
| body | comments.body | |
| meta | comments.created_at | |

`标签条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| tag | = | {slug} |

`专栏条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| column_slug | = | {slug} |

`管理员` =

| 行 | 用户名 | 密码 |
|----|--------|------|
| 1 | admin | quantum2026 |

`站点图标` =

| 路径 | 关系 | 类型 | 尺寸 | 地址 |
|------|------|------|------|------|
| "public/favicon.ico" | icon | "image/x-icon" | any | "/favicon.ico" |
| "public/favicon.svg" | icon | "image/svg+xml" | any | "/icons/favicon.svg" |

`品牌图` =

| 源 | 替代 | 类 | 链接 | 宽度 | 加载 |
|----|------|----|------|------|------|
| "/static/logo.png" | 求道量子 | brand-logo | "/" | 96 | eager |

`文章资源` =

| 关系 | 地址 | 推迟 | 版本 |
|------|------|------|------|
| stylesheet | "/static/katex/katex.min.css" | | |
| script | "/static/katex/katex.min.js" | true | |
| script | "/static/katex/auto-render.min.js" | true | |

`发资源` =

| 关系 | 地址 | 推迟 | 版本 |
|------|------|------|------|

`发布字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| title | 标题 | text | true | |
| slug | 链接标识 | text | false | |
| tag | 标签 | text | false | |
| column_slug | 专栏 | text | false | |
| pinned | 置顶 | text | false | 0 |
| summary | 摘要 | textarea | false | |
| content | 正文 | markdown | true | |

`编辑字段` =

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

`发布规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| title | required | 请填写标题 |
| title | max:200 | 标题请控制在 200 字以内 |
| slug | max:80 | 链接标识最长 80 字符 |
| tag | max:32 | 标签最长 32 字符 |
| column_slug | max:64 | 专栏标识最长 64 字符 |
| content | required | 请填写正文 |

`编辑规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少文章编号 |
| title | required | 请填写标题 |
| title | max:200 | 标题请控制在 200 字以内 |
| slug | max:80 | 链接标识最长 80 字符 |
| tag | max:32 | 标签最长 32 字符 |
| column_slug | max:64 | 专栏标识最长 64 字符 |
| content | required | 请填写正文 |

`管理列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | posts.title | |
| body | posts.summary | |
| meta | posts.updated_at | |
| tag | posts.tag | |
| href | posts.id | |

`专栏管理列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | columns.name | |
| body | columns.summary | |
| meta | columns.status | |
| tag | columns.slug | |
| href | columns.id | |

`新闻管理列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | news.title | |
| body | news.summary | |
| meta | news.published_at | |
| tag | news.source | |
| href | news.id | |

`评论管理列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | comments.author | |
| body | comments.body | |
| meta | comments.created_at | |
| tag | comments.post_slug | |
| href | comments.id | |

`评论管理字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 编号 | hidden | true | |
| post_slug | 文章标识 | text | true | |
| author | 作者 | text | true | |
| body | 正文 | textarea | true | |
| created_at | 时间 | text | false | |

`评论管理规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少评论编号 |
| body | required | 请填写评论 |
| body | max:2000 | 评论请控制在 2000 字以内 |

`评论删除字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 编号 | hidden | true | |
| post_slug | 文章 | text | false | |
| author | 作者 | text | false | |
| body | 内容 | textarea | false | |
| created_at | 时间 | text | false | |

`专栏发布字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| name | 名称 | text | true | |
| slug | 链接标识 | text | true | |
| summary | 摘要 | textarea | false | |
| sort_order | 排序 | text | false | 0 |
| status | 状态 | text | false | ongoing |
| created_at | 创建时间 | text | false | |

`专栏编辑字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 编号 | hidden | true | |
| name | 名称 | text | true | |
| slug | 链接标识 | text | true | |
| summary | 摘要 | textarea | false | |
| sort_order | 排序 | text | false | |
| status | 状态 | text | false | |
| created_at | 创建时间 | text | false | |

`新闻发布字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 | 来源 |
|------|------|------|------|------|------|
| title | 标题 | text | true | | |
| url | 原文链接 | text | true | | |
| source | 来源 | text | false | | |
| summary | 摘要 | textarea | false | | |
| published_at | 发布日期 | text | false | | 空则现在 |
| created_at | 入库时间 | text | false | | 空则现在 |

`新闻编辑字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 | 来源 |
|------|------|------|------|------|------|
| id | 编号 | hidden | true | | |
| title | 标题 | text | true | | |
| url | 原文链接 | text | true | | |
| source | 来源 | text | false | | |
| summary | 摘要 | textarea | false | | |
| published_at | 发布日期 | text | false | | 空则现在 |
| created_at | 入库时间 | text | false | |

`专栏发布规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| name | required | 请填写专栏名称 |
| name | max:120 | 名称最长 120 字符 |
| slug | required | 请填写 slug |
| slug | max:64 | slug 最长 64 字符 |
| summary | max:500 | 摘要最长 500 字符 |

`专栏编辑规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少专栏编号 |
| name | required | 请填写专栏名称 |
| slug | required | 请填写 slug |
| slug | max:64 | slug 最长 64 字符 |

`新闻发布规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| title | required | 请填写标题 |
| title | max:200 | 标题最长 200 字符 |
| url | required | 请填写原文链接 |
| url | max:500 | 链接最长 500 字符 |
| source | max:64 | 来源最长 64 字符 |

`新闻编辑规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| id | required | 缺少新闻编号 |
| title | required | 请填写标题 |
| url | required | 请填写原文链接 |

`评论字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 | 来源 |
|------|------|------|------|------|------|
| body | 写下回信 | textarea | true | | client |
| author | | text | true | | session.username |
| post_slug | | text | true | | route.slug |
| created_at | | text | false | | now |

`评论规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| body | required | 请填写评论 |
| body | max:2000 | 评论请控制在 2000 字以内 |
| author | required | 请先登录后再评论 |
| post_slug | required | 缺少文章标识 |

**comment_form = > 网页.表单 表="comments" 动作="插入"**
**comment_form = > comment_form.字段 字段=`评论字段`**
**comment_form = > comment_form.规则 规则=`评论规则`**
**comment_form = > comment_form.文案 提交="投递" 取消=" " 取消链接="#"**

**comment_edit_form = > 网页.表单 表="comments" 动作="更新"**
**comment_edit_form = > comment_edit_form.字段 字段=`评论管理字段`**
**comment_edit_form = > comment_edit_form.规则 规则=`评论管理规则`**
**comment_edit_form = > comment_edit_form.文案 提交="保存评论" 取消="返回列表" 取消链接="/admin/comments"**

**comment_delete_form = > 网页.表单 表="comments" 动作="删除"**
**comment_delete_form = > comment_delete_form.字段 字段=`评论删除字段`**
**comment_delete_form = > comment_delete_form.文案 提交="删除这条评论" 取消="返回列表" 取消链接="/admin/comments"**

**store = > db.打开**
**session_url = > db.会话地址**

**主题CSS = > theme.全局**
**动效CSS = > motion.全局**
**刊CSS = > volumeStyle.全局**
**写作台样式 = > editorStyle.全局**

`前台样式段` =

| css |
|-----|
| `主题CSS` |
| `动效CSS` |
| `刊CSS` |

`写作台样式段` =

| css |
|-----|
| `主题CSS` |
| `动效CSS` |
| `刊CSS` |
| `写作台样式` |

**首页CSS = > text.str_join xs=`前台样式段` sep=""**
**写作台CSS = > text.str_join xs=`写作台样式段` sep=""**

## 装刊壳
    + `p`

SSR 顶栏品牌 + WASM 客户端（主题/抽屉/进度/揭示）。

**p = > p.导航品牌 标题="求道量子" 链接="/" 标志="/static/logo.png" 浅色标志="/static/logo-light.png" 主题键="mq-theme"**
**p = > p.客户端 源="/static/client.mq.md"**
*`p`*

**page = > 网页.页面 标题="求道量子"**
**page_intro = > intros.首页引言**
**page = > page.引言装配 引言=page_intro**
**page = > page.组件装配 组件=`首页`**
**page = > 装刊壳 p=page**
**page = > page.主体装配 主体=`列表`**
**page = > page.排序 排序="-pinned,-created_at"**
**page = > page.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**page = > page.样式 样式=`首页CSS`**
**page = > page.图片装配 表=`品牌图`**

**about = > 网页.页面 标题="关于"**
**about_intro = > intros.关于引言**
**about = > about.引言装配 引言=about_intro**
**about = > about.组件装配 组件=`首页`**
**about = > 装刊壳 p=about**
**about = > about.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**about = > about.样式 样式=`首页CSS`**

**post = > 网页.页面 标题="文章"**
**post_intro = > intros.文章引言**
**post = > post.引言装配 引言=post_intro**
**post = > post.组件装配 组件=`首页`**
**post = > 装刊壳 p=post**
**post = > post.主体装配 主体=`详情绑定`**
**post = > post.查询条件 条件=`文章条件`**
**post = > post.详情 详情=True**
**post = > post.列表装配 主体=`评论卡片` 条件=`评论条件` 排序="-created_at" 插槽="#comment-list"**
**post = > post.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**post = > post.表单装配 表单=`comment_form` id="comment" 表单插槽="#comment-form-mount"**
**post = > post.样式 样式=`首页CSS`**
**post = > post.头装配 表=`文章资源`**

**tags = > 网页.页面 标题="标签归档"**
**tags_intro = > intros.标签引言**
**tags = > tags.引言装配 引言=tags_intro**
**tags = > tags.组件装配 组件=`首页`**
**tags = > 装刊壳 p=tags**
**tags = > tags.主体装配 主体=`标签列表`**
**tags = > tags.链接前缀 前缀="/tag/"**
**tags = > tags.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**tags = > tags.样式 样式=`首页CSS`**

**tagged = > 网页.页面 标题="标签"**
**tagged = > tagged.组件装配 组件=`首页`**
**tagged = > 装刊壳 p=tagged**
**tagged = > tagged.主体装配 主体=`列表`**
**tagged = > tagged.查询条件 条件=`标签条件`**
**tagged = > tagged.排序 排序="-pinned,-created_at"**
**tagged = > tagged.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**tagged = > tagged.样式 样式=`首页CSS`**

**columns = > 网页.页面 标题="专栏书架"**
**columns_intro = > intros.专栏书架引言**
**columns = > columns.引言装配 引言=columns_intro**
**columns = > columns.组件装配 组件=`首页`**
**columns = > 装刊壳 p=columns**
**columns = > columns.主体装配 主体=`专栏列表`**
**columns = > columns.排序 排序="sort_order"**
**columns = > columns.链接前缀 前缀="/column/"**
**columns = > columns.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**columns = > columns.样式 样式=`首页CSS`**

**news = > 网页.页面 标题="量子新闻"**
**news_intro = > intros.新闻引言**
**news = > news.引言装配 引言=news_intro**
**news = > news.组件装配 组件=`首页`**
**news = > 装刊壳 p=news**
**news = > news.主体装配 主体=`新闻列表`**
**news = > news.排序 排序="-published_at"**
**news = > news.样式 样式=`首页CSS`**

**column = > 网页.页面 标题="开卷"**
**column_intro = > intros.开卷引言**
**column = > column.引言装配 引言=column_intro**
**column = > column.组件装配 组件=`首页`**
**column = > 装刊壳 p=column**
**column = > column.主体装配 主体=`列表`**
**column = > column.查询条件 条件=`专栏条件`**
**column = > column.排序 排序="created_at"**
**column = > column.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**column = > column.样式 样式=`首页CSS`**

`站点接口` =

| 路径 | 方法 | 表 | 条件 | 排序 | 上限 |
|------|------|----|------|------|------|
| api/posts | GET | posts | | "-pinned,-updated_at" | 500 |
| api/columns | GET | columns | | sort_order | 50 |
| api/news | GET | news | | "-published_at" | 40 |

**post_form = > 网页.表单 表="posts" 动作="插入"**
**post_form = > post_form.字段 字段=`发布字段`**
**post_form = > post_form.规则 规则=`发布规则`**
**post_form = > post_form.文案 提交="发布文章" 取消="返回列表" 取消链接="/admin/posts"**

**edit_form = > 网页.表单 表="posts" 动作="更新"**
**edit_form = > edit_form.字段 字段=`编辑字段`**
**edit_form = > edit_form.规则 规则=`编辑规则`**
**edit_form = > edit_form.文案 提交="保存文章" 取消="返回列表" 取消链接="/admin/posts"**

**column_form = > 网页.表单 表="columns" 动作="插入"**
**column_form = > column_form.字段 字段=`专栏发布字段`**
**column_form = > column_form.规则 规则=`专栏发布规则`**
**column_form = > column_form.文案 提交="创建专栏" 取消="返回列表" 取消链接="/admin/columns"**

**column_edit_form = > 网页.表单 表="columns" 动作="更新"**
**column_edit_form = > column_edit_form.字段 字段=`专栏编辑字段`**
**column_edit_form = > column_edit_form.规则 规则=`专栏编辑规则`**
**column_edit_form = > column_edit_form.文案 提交="保存专栏" 取消="返回列表" 取消链接="/admin/columns"**

**news_form = > 网页.表单 表="news" 动作="插入"**
**news_form = > news_form.字段 字段=`新闻发布字段`**
**news_form = > news_form.规则 规则=`新闻发布规则`**
**news_form = > news_form.文案 提交="发布快讯" 取消="返回列表" 取消链接="/admin/news"**

**news_edit_form = > 网页.表单 表="news" 动作="更新"**
**news_edit_form = > news_edit_form.字段 字段=`新闻编辑字段`**
**news_edit_form = > news_edit_form.规则 规则=`新闻编辑规则`**
**news_edit_form = > news_edit_form.文案 提交="保存快讯" 取消="返回列表" 取消链接="/admin/news"**

**login = > 网页.页面 标题="登录"**
**login_intro = > intros.登录引言**
**login = > login.引言装配 引言=login_intro**
**login = > login.组件装配 组件=`首页`**
**login = > 装刊壳 p=login**
**login = > login.壳HTML 体类="auth-page"**
**login = > login.样式 样式=`首页CSS`**

**register = > 网页.页面 标题="注册"**
**register_intro = > intros.注册引言**
**register = > register.引言装配 引言=register_intro**
**register = > register.组件装配 组件=`首页`**
**register = > 装刊壳 p=register**
**register = > register.壳HTML 体类="auth-page"**
**register = > register.样式 样式=`首页CSS`**

**desk_login = > 网页.页面 标题="后台登录"**
**desk_login_intro = > intros.后台登录引言**
**desk_login = > desk_login.引言装配 引言=desk_login_intro**
**desk_login = > 装刊壳 p=desk_login**
**desk_login = > desk_login.壳HTML 体类="desk-login"**
**desk_login = > desk_login.样式 样式=`写作台CSS`**

**desk_hub = > 网页.页面 标题="后台管理"**
**desk_hub_intro = > intros.后台概览引言**
**desk_hub = > desk_hub.引言装配 引言=desk_hub_intro**
**desk_hub = > desk_hub.组件装配 组件=admin.`后台壳`**
**desk_hub = > 装刊壳 p=desk_hub**
**desk_hub = > desk_hub.壳HTML 体类="desk-admin"**
**desk_hub = > desk_hub.样式 样式=`写作台CSS`**

**publish = > 网页.页面 标题="文章管理"**
**publish_intro = > intros.文章管理引言**
**publish = > publish.引言装配 引言=publish_intro**
**publish = > publish.组件装配 组件=admin.`后台壳`**
**publish = > 装刊壳 p=publish**
**publish = > publish.壳HTML 体类="desk-admin desk-list"**
**publish = > publish.主体装配 主体=`管理列表`**
**publish = > publish.排序 排序="-updated_at"**
**publish = > publish.链接前缀 前缀="/admin/posts/"**
**publish = > publish.样式 样式=`写作台CSS`**

**publish_new = > 网页.页面 标题="撰写新稿"**
**publish_new_intro = > intros.撰写新稿引言**
**publish_new = > publish_new.引言装配 引言=publish_new_intro**
**publish_new = > publish_new.组件装配 组件=admin.`后台壳`**
**publish_new = > 装刊壳 p=publish_new**
**publish_new = > publish_new.壳HTML 体类="desk-admin desk-writing"**
**publish_new = > publish_new.表单装配 表单=`post_form` id="post"**
**publish_new = > publish_new.样式 样式=`写作台CSS`**

**publish_edit = > 网页.页面 标题="编辑文章"**
**publish_edit_intro = > intros.编辑文章引言**
**publish_edit = > publish_edit.引言装配 引言=publish_edit_intro**
**publish_edit = > publish_edit.组件装配 组件=admin.`后台壳`**
**publish_edit = > 装刊壳 p=publish_edit**
**publish_edit = > publish_edit.壳HTML 体类="desk-admin desk-writing"**
**publish_edit = > publish_edit.表单装配 表单=`edit_form` id="post-edit"**
**publish_edit = > publish_edit.表单载入 表="posts"**
**publish_edit = > publish_edit.样式 样式=`写作台CSS`**

**admin_columns = > 网页.页面 标题="专栏管理"**
**admin_columns_intro = > intros.专栏管理引言**
**admin_columns = > admin_columns.引言装配 引言=admin_columns_intro**
**admin_columns = > admin_columns.组件装配 组件=admin.`后台壳`**
**admin_columns = > 装刊壳 p=admin_columns**
**admin_columns = > admin_columns.壳HTML 体类="desk-admin desk-list"**
**admin_columns = > admin_columns.主体装配 主体=`专栏管理列表`**
**admin_columns = > admin_columns.排序 排序="sort_order"**
**admin_columns = > admin_columns.链接前缀 前缀="/admin/columns/"**
**admin_columns = > admin_columns.样式 样式=`写作台CSS`**

**admin_columns_new = > 网页.页面 标题="新建专栏"**
**admin_columns_new_intro = > intros.新建专栏引言**
**admin_columns_new = > admin_columns_new.引言装配 引言=admin_columns_new_intro**
**admin_columns_new = > admin_columns_new.组件装配 组件=admin.`后台壳`**
**admin_columns_new = > 装刊壳 p=admin_columns_new**
**admin_columns_new = > admin_columns_new.壳HTML 体类="desk-admin desk-writing"**
**admin_columns_new = > admin_columns_new.表单装配 表单=`column_form` id="column"**
**admin_columns_new = > admin_columns_new.样式 样式=`写作台CSS`**

**admin_columns_edit = > 网页.页面 标题="编辑专栏"**
**admin_columns_edit_intro = > intros.编辑专栏引言**
**admin_columns_edit = > admin_columns_edit.引言装配 引言=admin_columns_edit_intro**
**admin_columns_edit = > admin_columns_edit.组件装配 组件=admin.`后台壳`**
**admin_columns_edit = > 装刊壳 p=admin_columns_edit**
**admin_columns_edit = > admin_columns_edit.壳HTML 体类="desk-admin desk-writing"**
**admin_columns_edit = > admin_columns_edit.表单装配 表单=`column_edit_form` id="column-edit"**
**admin_columns_edit = > admin_columns_edit.表单载入 表="columns"**
**admin_columns_edit = > admin_columns_edit.样式 样式=`写作台CSS`**

**admin_news = > 网页.页面 标题="新闻管理"**
**admin_news_intro = > intros.新闻管理引言**
**admin_news = > admin_news.引言装配 引言=admin_news_intro**
**admin_news = > admin_news.组件装配 组件=admin.`后台壳`**
**admin_news = > 装刊壳 p=admin_news**
**admin_news = > admin_news.壳HTML 体类="desk-admin desk-list"**
**admin_news = > admin_news.主体装配 主体=`新闻管理列表`**
**admin_news = > admin_news.排序 排序="-published_at"**
**admin_news = > admin_news.链接前缀 前缀="/admin/news/"**
**admin_news = > admin_news.样式 样式=`写作台CSS`**

**admin_news_new = > 网页.页面 标题="新建快讯"**
**admin_news_new_intro = > intros.新建快讯引言**
**admin_news_new = > admin_news_new.引言装配 引言=admin_news_new_intro**
**admin_news_new = > admin_news_new.组件装配 组件=admin.`后台壳`**
**admin_news_new = > 装刊壳 p=admin_news_new**
**admin_news_new = > admin_news_new.壳HTML 体类="desk-admin desk-writing"**
**admin_news_new = > admin_news_new.表单装配 表单=`news_form` id="news"**
**admin_news_new = > admin_news_new.样式 样式=`写作台CSS`**

**admin_news_edit = > 网页.页面 标题="编辑快讯"**
**admin_news_edit_intro = > intros.编辑快讯引言**
**admin_news_edit = > admin_news_edit.引言装配 引言=admin_news_edit_intro**
**admin_news_edit = > admin_news_edit.组件装配 组件=admin.`后台壳`**
**admin_news_edit = > 装刊壳 p=admin_news_edit**
**admin_news_edit = > admin_news_edit.壳HTML 体类="desk-admin desk-writing"**
**admin_news_edit = > admin_news_edit.表单装配 表单=`news_edit_form` id="news-edit"**
**admin_news_edit = > admin_news_edit.表单载入 表="news"**
**admin_news_edit = > admin_news_edit.样式 样式=`写作台CSS`**

**admin_comments = > 网页.页面 标题="评论管理"**
**admin_comments_intro = > intros.评论管理引言**
**admin_comments = > admin_comments.引言装配 引言=admin_comments_intro**
**admin_comments = > admin_comments.组件装配 组件=admin.`后台壳`**
**admin_comments = > 装刊壳 p=admin_comments**
**admin_comments = > admin_comments.壳HTML 体类="desk-admin desk-list"**
**admin_comments = > admin_comments.主体装配 主体=`评论管理列表`**
**admin_comments = > admin_comments.排序 排序="-created_at"**
**admin_comments = > admin_comments.链接前缀 前缀="/admin/comments/"**
**admin_comments = > admin_comments.样式 样式=`写作台CSS`**

**admin_comments_edit = > 网页.页面 标题="编辑评论"**
**admin_comments_edit_intro = > intros.编辑评论引言**
**admin_comments_edit = > admin_comments_edit.引言装配 引言=admin_comments_edit_intro**
**admin_comments_edit = > admin_comments_edit.组件装配 组件=admin.`后台壳`**
**admin_comments_edit = > 装刊壳 p=admin_comments_edit**
**admin_comments_edit = > admin_comments_edit.壳HTML 体类="desk-admin desk-writing"**
**admin_comments_edit = > admin_comments_edit.表单装配 表单=`comment_edit_form` id="comment-edit"**
**admin_comments_edit = > admin_comments_edit.表单载入 表="comments"**
**admin_comments_edit = > admin_comments_edit.样式 样式=`写作台CSS`**

**admin_comments_delete = > 网页.页面 标题="删除评论"**
**admin_comments_delete_intro = > intros.删除评论引言**
**admin_comments_delete = > admin_comments_delete.引言装配 引言=admin_comments_delete_intro**
**admin_comments_delete = > admin_comments_delete.组件装配 组件=admin.`后台壳`**
**admin_comments_delete = > 装刊壳 p=admin_comments_delete**
**admin_comments_delete = > admin_comments_delete.壳HTML 体类="desk-admin desk-writing"**
**admin_comments_delete = > admin_comments_delete.表单装配 表单=`comment_delete_form` id="comment-delete"**
**admin_comments_delete = > admin_comments_delete.表单载入 表="comments"**
**admin_comments_delete = > admin_comments_delete.样式 样式=`写作台CSS`**

**app = > 网页.应用 页面=page 数据库=store 后台=False 登录回跳="/" 登出回跳="/" 壳样式="minimal" 资源版本="20260918g" 主机="0.0.0.0" 端口=18085**
**app = > app.路由 路径="/about" 页面=about**
**app = > app.路由 路径="/post/{slug}" 页面=post**
**app = > app.路由 路径="/tags" 页面=tags**
**app = > app.路由 路径="/tag/{slug}" 页面=tagged**
**app = > app.路由 路径="/columns" 页面=columns**
**app = > app.路由 路径="/column/{slug}" 页面=column**
**app = > app.路由 路径="/news" 页面=news**
**app = > app.路由 路径="/login" 页面=login**
**app = > app.路由 路径="/register" 页面=register**
**app = > app.路由 路径="/admin/login" 页面=desk_login**
**app = > app.路由 路径="/admin" 页面=desk_hub**
**app = > app.路由 路径="/admin/posts" 页面=publish**
**app = > app.路由 路径="/admin/posts/new" 页面=publish_new**
**app = > app.路由 路径="/admin/posts/{id}" 页面=publish_edit**
**app = > app.路由 路径="/admin/columns" 页面=admin_columns**
**app = > app.路由 路径="/admin/columns/new" 页面=admin_columns_new**
**app = > app.路由 路径="/admin/columns/{id}" 页面=admin_columns_edit**
**app = > app.路由 路径="/admin/news" 页面=admin_news**
**app = > app.路由 路径="/admin/news/new" 页面=admin_news_new**
**app = > app.路由 路径="/admin/news/{id}" 页面=admin_news_edit**
**app = > app.路由 路径="/admin/comments" 页面=admin_comments**
**app = > app.路由 路径="/admin/comments/delete/{id}" 页面=admin_comments_delete**
**app = > app.路由 路径="/admin/comments/{id}" 页面=admin_comments_edit**
**app = > app.重定向 来源="/admin-publish" 目标="/admin/posts" 永久=真**
**app = > app.重定向 来源="/admin-edit" 目标="/admin/posts" 永久=真**
**app = > app.重定向 来源="/desk" 目标="/admin" 永久=真**
**app = > app.重定向 来源="/desk/login" 目标="/admin/login" 永久=真**
**app = > app.重定向 来源="/desk/posts" 目标="/admin/posts" 永久=真**
**app = > app.重定向 来源="/desk/columns" 目标="/admin/columns" 永久=真**
**app = > app.重定向 来源="/desk/news" 目标="/admin/news" 永久=真**
**app = > app.重定向 来源="/_auth/login" 目标="/admin/login" 永久=真**
**app = > app.重定向 来源="/_auth/logout" 目标="/admin/logout" 永久=真**
**app = > app.挂载表单 id="post-edit" 表单=`edit_form`**
**app = > app.挂载表单 id="column-edit" 表单=`column_edit_form`**
**app = > app.挂载表单 id="news-edit" 表单=`news_edit_form`**
**app = > app.挂载表单 id="comment" 表单=`comment_form`**
**app = > app.挂载表单 id="comment-edit" 表单=`comment_edit_form`**
**app = > app.挂载表单 id="comment-delete" 表单=`comment_delete_form`**
**app = > app.装配 接口=`站点接口`**
**app = > app.静态 目录="public" 挂载="/static"**
**app = > app.图标 表=`站点图标`**
**app = > app.启用权限**
**app = > app.鉴权 用户表=None 会话时长=3600 登录路径="/login" 登录回跳="/" 登出回跳="/" 注册=真 注册路径="/register" 默认角色="member" 会话地址=session_url**
**oidc_issuer = > 系统.取环境 名="QDQC_OIDC_ISSUER"**
**oidc_client = > 系统.取环境 名="QDQC_OIDC_CLIENT_ID"**
**oidc_secret = > 系统.取环境 名="QDQC_OIDC_CLIENT_SECRET"**
**oidc_redirect = > 系统.取环境 名="QDQC_OIDC_REDIRECT_URI"**
1. oidc_client
  **app = > app.统一身份 发行方=oidc_issuer 客户端编号=oidc_client 客户端密钥=oidc_secret 回调=oidc_redirect**
**app = > app.门禁 路径="/admin" 权限="desk:access" 匹配="prefix" 拒绝="redirect" 排除="/admin/login,/login,/register,/oidc/callback,/oidc/login,/oidc/register"**
**app = > app.门禁 路径="/_form/post" 权限="posts:edit" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/post-edit" 权限="posts:edit" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/column" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/column-edit" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/news" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/news-edit" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/comment" 权限="comments:create" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/comment-edit" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/comment-delete" 权限="comments:delete" 匹配="exact" 拒绝="redirect"**
> `app`.监听
