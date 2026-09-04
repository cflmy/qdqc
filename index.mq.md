---
title: 求道量子
description: 求道量子，以求道之心，探量子之密。
导入 网页:ext/web/网页.mq.md
import theme:styles/theme.mq.md
import motion:styles/brand-motion.mq.md
import volumeStyle:styles/volume.mq.md
import editorStyle:styles/editor.mq.md
import text:lib/text.mq.md
import admin:components/admin.mq.md
import nav:components/nav.mq.md
import side:components/side.mq.md
import foot:components/foot.mq.md
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

`文章条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| slug | = | {slug} |

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
| "public/logo.png" | icon | "image/png" | any | "/icons/logo.png" |

`品牌图` =

| 源 | 替代 | 类 | 链接 | 宽度 | 加载 |
|----|------|----|------|------|------|
| "/static/logo.png" | 求道量子 | brand-logo | "/" | 96 | eager |

`头资源` =

| 关系 | 地址 | 类型 | 尺寸 | 媒体 | 作为 | 跨域 |
|------|------|------|------|------|------|------|
| stylesheet | "/static/katex/katex.min.css" | | | | | |
| script | "/static/katex/katex.min.js" | | | | | |
| script | "/static/katex/auto-render.min.js" | | | | | |
| script | "/static/theme.js?v=14" | | | | | |
| script | "/static/desk-guard.js?v=2" | | | | | |
| script | "/static/volume.js?v=14" | | | | | |

`登录资源` =

| 关系 | 地址 | 类型 | 尺寸 | 媒体 | 作为 | 跨域 |
|------|------|------|------|------|------|------|
| script | "/static/desk-login.js?v=4" | | | | | |

`发资源` =

| 关系 | 地址 | 类型 | 尺寸 | 媒体 | 作为 | 跨域 |
|------|------|------|------|------|------|------|
| stylesheet | "/static/katex/katex.min.css" | | | | | |
| script | "/static/katex/katex.min.js" | | | | | |
| script | "/static/katex/auto-render.min.js" | | | | | |
| script | "/static/theme.js?v=14" | | | | | |
| script | "/static/desk-guard.js?v=2" | | | | | |
| script | "/static/admin.js?v=4" | | | | | |
| script | "/static/editor.js?v=25" | | | | | |

`发布字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| title | 标题 | text | true | |
| slug | 链接标识 | text | false | |
| tag | 标签 | text | false | |
| column_slug | 专栏 | text | false | |
| pinned | 置顶 | text | false | 0 |
| summary | 摘要 | textarea | false | |
| content | 正文 | textarea | true | |

`编辑字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 文章编号 | text | true | |
| title | 标题 | text | true | |
| slug | 链接标识 | text | false | |
| tag | 标签 | text | false | |
| column_slug | 专栏 | text | false | |
| pinned | 置顶 | text | false | 0 |
| summary | 摘要 | textarea | false | |
| content | 正文 | textarea | true | |

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
| id | 编号 | text | true | |
| name | 名称 | text | true | |
| slug | 链接标识 | text | true | |
| summary | 摘要 | textarea | false | |
| sort_order | 排序 | text | false | |
| status | 状态 | text | false | |
| created_at | 创建时间 | text | false | |

`新闻发布字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| title | 标题 | text | true | |
| url | 原文链接 | text | true | |
| source | 来源 | text | false | |
| summary | 摘要 | textarea | false | |
| published_at | 发布日期 | text | false | |
| created_at | 入库时间 | text | false | |

`新闻编辑字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| id | 编号 | text | true | |
| title | 标题 | text | true | |
| url | 原文链接 | text | true | |
| source | 来源 | text | false | |
| summary | 摘要 | textarea | false | |
| published_at | 发布日期 | text | false | |
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

*store = > db.打开*

*主题CSS = > theme.全局*
*动效CSS = > motion.全局*
*刊CSS = > volumeStyle.全局*
*写作台样式 = > editorStyle.全局*

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

*首页CSS = > text.str_join xs=`前台样式段` sep=""*
*写作台CSS = > text.str_join xs=`写作台样式段` sep=""*

*page = > 网页.页面 标题="求道量子" 引言="<p class='kicker'>// Journal</p><h1>求道量子</h1><p class='lede slogan'>以求道之心，探量子之密。</p><section class='column-gate column-gate--shelf' aria-label='专栏入口'><p class='column-gate-label'>本刊三卷</p><ul class='column-gate-list'><li><a href='/column/marqdo'><div class='cg-media'><img src='/static/covers/vol-marqdo.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 01</span><span class='cg-name'>Marqdo 专栏</span><span class='cg-desc'>文档即代码，把站点写进 .mq.md</span></div></a></li><li><a href='/column/linear-algebra'><div class='cg-media'><img src='/static/covers/vol-linear-algebra.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 02</span><span class='cg-name'>线性代数专栏</span><span class='cg-desc'>向量与矩阵——量子语言的语法</span></div></a></li><li><a href='/column/quantum-algorithms'><div class='cg-media'><img src='/static/covers/vol-quantum.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 03</span><span class='cg-name'>量子算法专栏</span><span class='cg-desc'>门线路、Shor / Grover 与纠错入门</span></div></a></li></ul><p class='column-gate-more'><a href='/columns'>进入专栏书架 →</a></p></section>"*
*page = > page.组件装配 组件=`首页`*
*page = > page.主体装配 主体=`列表`*
*page = > page.排序 排序="-pinned,-created_at"*
*page = > page.样式 样式=`首页CSS`*
*page = > page.头装配 表=`头资源`*
*page = > page.图片装配 表=`品牌图`*

*about = > 网页.页面 标题="关于" 引言="<p class='kicker'>// about</p><h1>关于本刊</h1><p class='lede slogan'>求道量子，以求道之心，探量子之密。</p><p>我们关注可核对的概念、可复述的直觉，以及算法与硬件之间正在发生的事。内容按三条专栏组织：<strong>Marqdo</strong>（工具与表达）、<strong>线性代数</strong>（量子前置数学）、<strong>量子算法</strong>（门线路与算法入门）；标签仍作横切检索。正文采用论文阅读栏的版式。</p>"*
*about = > about.组件装配 组件=`首页`*
*about = > about.样式 样式=`首页CSS`*
*about = > about.头装配 表=`头资源`*

*post = > 网页.页面 标题="文章"*
*post = > post.组件装配 组件=`首页`*
*post = > post.主体装配 主体=`详情绑定`*
*post = > post.查询条件 条件=`文章条件`*
*post = > post.详情 详情=True*
*post = > post.样式 样式=`首页CSS`*
*post = > post.头装配 表=`头资源`*

*tags = > 网页.页面 标题="标签归档" 引言="<p class='kicker'>// index</p><h1>栏目索引</h1><p class='lede'>按主题浏览全部文章。</p>"*
*tags = > tags.组件装配 组件=`首页`*
*tags = > tags.主体装配 主体=`标签列表`*
*tags = > tags.链接前缀 前缀="/tag/"*
*tags = > tags.样式 样式=`首页CSS`*
*tags = > tags.头装配 表=`头资源`*

*tagged = > 网页.页面 标题="标签"*
*tagged = > tagged.组件装配 组件=`首页`*
*tagged = > tagged.主体装配 主体=`列表`*
*tagged = > tagged.查询条件 条件=`标签条件`*
*tagged = > tagged.排序 排序="-pinned,-created_at"*
*tagged = > tagged.样式 样式=`首页CSS`*
*tagged = > tagged.头装配 表=`头资源`*

*columns = > 网页.页面 标题="专栏书架" 引言="<p class='kicker'>// library</p><h1>专栏书架</h1><p class='lede'>装载中…</p>"*
*columns = > columns.组件装配 组件=`首页`*
*columns = > columns.主体装配 主体=`专栏列表`*
*columns = > columns.排序 排序="sort_order"*
*columns = > columns.链接前缀 前缀="/column/"*
*columns = > columns.样式 样式=`首页CSS`*
*columns = > columns.头装配 表=`头资源`*

*news = > 网页.页面 标题="量子新闻" 引言="<p class='kicker'>// brief</p><h1>量子新闻</h1><p class='lede'>装载快讯…</p>"*
*news = > news.组件装配 组件=`首页`*
*news = > news.样式 样式=`首页CSS`*
*news = > news.头装配 表=`头资源`*

*column = > 网页.页面 标题="开卷" 引言="<p class='kicker'>// volume</p><h1>开卷</h1><p class='lede'>装载目录…</p>"*
*column = > column.组件装配 组件=`首页`*
*column = > column.主体装配 主体=`列表`*
*column = > column.查询条件 条件=`专栏条件`*
*column = > column.排序 排序="created_at"*
*column = > column.样式 样式=`首页CSS`*
*column = > column.头装配 表=`头资源`*

`站点接口` =

| 路径 | 方法 | 表 | 条件 | 排序 | 上限 |
|------|------|----|------|------|------|
| api/posts | GET | posts | | "-pinned,-updated_at" | 500 |
| api/columns | GET | columns | | sort_order | 50 |
| api/news | GET | news | | "-published_at" | 40 |

*post_form = > 网页.表单 表="posts" 动作="插入"*
*post_form = > post_form.字段 字段=`发布字段`*
*post_form = > post_form.规则 规则=`发布规则`*

*edit_form = > 网页.表单 表="posts" 动作="更新"*
*edit_form = > edit_form.字段 字段=`编辑字段`*
*edit_form = > edit_form.规则 规则=`编辑规则`*

*column_form = > 网页.表单 表="columns" 动作="插入"*
*column_form = > column_form.字段 字段=`专栏发布字段`*
*column_form = > column_form.规则 规则=`专栏发布规则`*

*column_edit_form = > 网页.表单 表="columns" 动作="更新"*
*column_edit_form = > column_edit_form.字段 字段=`专栏编辑字段`*
*column_edit_form = > column_edit_form.规则 规则=`专栏编辑规则`*

*news_form = > 网页.表单 表="news" 动作="插入"*
*news_form = > news_form.字段 字段=`新闻发布字段`*
*news_form = > news_form.规则 规则=`新闻发布规则`*

*news_edit_form = > 网页.表单 表="news" 动作="更新"*
*news_edit_form = > news_edit_form.字段 字段=`新闻编辑字段`*
*news_edit_form = > news_edit_form.规则 规则=`新闻编辑规则`*

*desk_hub = > 网页.页面 标题="后台管理" 引言="<p class='kicker'>// desk</p><h1>后台管理</h1><p class='lede'>统一管理文章、专栏与量子新闻。</p><div class='admin-hub-grid'><a class='admin-hub-card' href='/desk/posts'><span class='admin-hub-kicker'>posts</span><strong>文章</strong><span>Markdown 写作台 · 发布与编辑长文</span></a><a class='admin-hub-card' href='/desk/columns'><span class='admin-hub-kicker'>columns</span><strong>专栏</strong><span>书架 Vol. 元数据 · slug 与排序</span></a><a class='admin-hub-card' href='/desk/news'><span class='admin-hub-kicker'>news</span><strong>新闻</strong><span>侧栏快讯 · 外链与发布日期</span></a></div><p class='admin-hub-note'>需管理员登录；未登录访问本页将自动要求登录。</p>"*
*desk_hub = > desk_hub.组件装配 组件=admin.`后台壳`*
*desk_hub = > desk_hub.样式 样式=`写作台CSS`*
*desk_hub = > desk_hub.头装配 表=`发资源`*

*login = > 网页.页面 标题="后台登录" 引言="<div class='desk-login'><p class='kicker'>// desk</p><h1>后台登录</h1><p class='lede'>管理员登录后进入自研后台，管理文章、专栏与新闻。</p><form id='desk-login-form' class='desk-login-form' method='post' action='/_auth/login'><label>用户名<input name='username' autocomplete='username' required autofocus/></label><label>密码<input name='password' type='password' autocomplete='current-password' required/></label><button type='submit'>登录</button></form><p id='desk-login-err' class='desk-login-err' hidden></p></div>"*
*login = > login.样式 样式=`写作台CSS`*
*login = > login.头装配 表=`登录资源`*

*publish = > 网页.页面 标题="文章管理" 引言="<p class='kicker'>// posts</p><h1>文章管理</h1><p class='lede'>查看已发布文章，或撰写新稿。</p>"*
*publish = > publish.组件装配 组件=admin.`后台壳`*
*publish = > publish.表单装配 表单=`post_form` id="post"*
*publish = > publish.主体装配 主体=`管理列表`*
*publish = > publish.排序 排序="-updated_at"*
*publish = > publish.链接前缀 前缀="/desk/posts?id="*
*publish = > publish.样式 样式=`写作台CSS`*
*publish = > publish.头装配 表=`发资源`*

*admin_columns = > 网页.页面 标题="专栏管理" 引言="<p class='kicker'>// columns</p><h1>专栏管理</h1><p class='lede'>维护书架上的专栏元数据。</p>"*
*admin_columns = > admin_columns.组件装配 组件=admin.`后台壳`*
*admin_columns = > admin_columns.表单装配 表单=`column_form` id="column"*
*admin_columns = > admin_columns.主体装配 主体=`专栏管理列表`*
*admin_columns = > admin_columns.排序 排序="sort_order"*
*admin_columns = > admin_columns.链接前缀 前缀="/desk/columns?id="*
*admin_columns = > admin_columns.样式 样式=`写作台CSS`*
*admin_columns = > admin_columns.头装配 表=`发资源`*

*admin_news = > 网页.页面 标题="新闻管理" 引言="<p class='kicker'>// news</p><h1>新闻管理</h1><p class='lede'>维护侧栏与 /news 页的量子快讯。</p>"*
*admin_news = > admin_news.组件装配 组件=admin.`后台壳`*
*admin_news = > admin_news.表单装配 表单=`news_form` id="news"*
*admin_news = > admin_news.主体装配 主体=`新闻管理列表`*
*admin_news = > admin_news.排序 排序="-published_at"*
*admin_news = > admin_news.链接前缀 前缀="/desk/news?id="*
*admin_news = > admin_news.样式 样式=`写作台CSS`*
*admin_news = > admin_news.头装配 表=`发资源`*

*app = > 网页.应用 页面=page 数据库=store 后台=True 后台前缀="/_auth" 登录回跳="/desk" 登出回跳="/login" 壳样式="minimal" 资源版本="20260904" 主机="0.0.0.0" 端口=18085*
*app = > app.路由 路径="/about" 页面=about*
*app = > app.路由 路径="/post/{slug}" 页面=post*
*app = > app.路由 路径="/tags" 页面=tags*
*app = > app.路由 路径="/tag/{slug}" 页面=tagged*
*app = > app.路由 路径="/columns" 页面=columns*
*app = > app.路由 路径="/column/{slug}" 页面=column*
*app = > app.路由 路径="/news" 页面=news*
*app = > app.路由 路径="/desk" 页面=desk_hub*
*app = > app.路由 路径="/desk/posts" 页面=publish*
*app = > app.路由 路径="/desk/columns" 页面=admin_columns*
*app = > app.路由 路径="/desk/news" 页面=admin_news*
*app = > app.路由 路径="/login" 页面=login*
*app = > app.路由 路径="/desk/login" 页面=login*
*app = > app.路由 路径="/admin-publish" 页面=publish*
*app = > app.路由 路径="/admin-edit" 页面=publish*
*app = > app.挂载表单 id="post-edit" 表单=`edit_form`*
*app = > app.挂载表单 id="column-edit" 表单=`column_edit_form`*
*app = > app.挂载表单 id="news-edit" 表单=`news_edit_form`*
*app = > app.装配 接口=`站点接口`*
*app = > app.静态 目录="public" 挂载="/static"*
*app = > app.图标 表=`站点图标`*
*app = > app.门禁 路径="/_auth" 角色="admin" 匹配="prefix" 拒绝="redirect" 排除="/_auth/login"*
*app = > app.鉴权 用户表=`管理员` 会话时长=3600 登录路径="/login" 登录回跳="/desk" 登出回跳="/login"*
*app = > app.门禁 路径="/desk" 角色="admin" 匹配="prefix" 拒绝="redirect" 排除="/login,/desk/login"*
*app = > app.门禁 路径="/_form/post" 角色="admin" 匹配="exact" 拒绝="redirect"*
*app = > app.门禁 路径="/_form/post-edit" 角色="admin" 匹配="exact" 拒绝="redirect"*
*app = > app.门禁 路径="/_form/column" 角色="admin" 匹配="exact" 拒绝="redirect"*
*app = > app.门禁 路径="/_form/column-edit" 角色="admin" 匹配="exact" 拒绝="redirect"*
*app = > app.门禁 路径="/_form/news" 角色="admin" 匹配="exact" 拒绝="redirect"*
*app = > app.门禁 路径="/_form/news-edit" 角色="admin" 匹配="exact" 拒绝="redirect"*
> `app`.监听
