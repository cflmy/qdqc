---
title: 求道量子
description: 求道量子 · 一个用 Marqdo web 扩展库构建的量子技术站点：博客文章、标签归档、讨论区论坛与登录门禁后台。
导入 网页:ext/web/网页.mq.md
import theme:styles/theme.mq.md
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

`文章条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| slug | = | {slug} |

`标签条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| tag | = | {slug} |

`论坛列表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | topics.title | |
| body | topics.summary | |
| meta | topics.created_at | |
| tag | topics.author | |
| href | topics.id | |

`主题条件` =

| 字段 | 操作 | 值 |
|------|------|-----|
| id | = | {tid} |

`主题详情` =

| 属性 | 值 | 样式 |
|------|-----|------|
| title | topics.title | |
| meta | topics.created_at | |
| tag | topics.author | |
| body | topics.content | |

`管理员` =

| 行 | 用户名 | 密码 |
|----|--------|------|
| 1 | admin | quantum2026 |

`站点图标` =

| 路径 | 关系 | 类型 | 尺寸 | 地址 |
|------|------|------|------|------|
| "public/favicon.ico" | icon | "image/x-icon" | any | "/favicon.ico" |
| "public/logo.png" | icon | "image/png" | any | "/icons/logo.png" |

`品牌图` =

| 源 | 替代 | 类 | 链接 | 宽度 | 加载 |
|----|------|----|------|------|------|
| "/static/logo.png" | 求道量子 | brand-logo | "/" | 64 | eager |

`头资源` =

| 关系 | 地址 | 类型 | 尺寸 | 媒体 | 作为 | 跨域 |
|------|------|------|------|------|------|------|
| script | "/static/theme.js" | | | | | |

`发资源` =

| 关系 | 地址 | 类型 | 尺寸 | 媒体 | 作为 | 跨域 |
|------|------|------|------|------|------|------|
| script | "/static/theme.js" | | | | | |
| stylesheet | "/static/editor.css?v=10" | | | | | |
| script | "/static/editor.js?v=10" | | | | | |

`主题字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| title | 标题 | text | true | |
| summary | 摘要 | textarea | false | |
| content | 正文 | textarea | true | |
| author | 昵称 | text | true | |

`主题规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| title | required | 请填写标题 |
| title | max:120 | 标题请控制在 120 字以内 |
| content | required | 请填写正文 |
| author | required | 请填写昵称 |
| author | max:32 | 昵称最长 32 字 |

`发布字段` =

| 字段 | 标签 | 类型 | 必填 | 默认 |
|------|------|------|------|------|
| title | 标题 | text | true | |
| slug | 链接标识 | text | false | |
| tag | 标签 | text | false | |
| summary | 摘要 | textarea | false | |
| content | 正文 | textarea | true | |

`发布规则` =

| 字段 | 规则 | 消息 |
|------|------|------|
| title | required | 请填写标题 |
| title | max:200 | 标题请控制在 200 字以内 |
| slug | max:80 | 链接标识最长 80 字符 |
| tag | max:32 | 标签最长 32 字符 |
| content | required | 请填写正文 |

*store = > db.打开*

*首页CSS = > theme.全局*

*page = > 网页.页面 标题="求道量子" 引言="<h1>求道量子</h1><p>一个专注于量子技术科普与分享的站点：叠加与纠缠、算法与硬件、与你一起求道于量子。</p>"*
*page = > page.组件装配 组件=`首页`*
*page = > page.主体装配 主体=`列表`*
*page = > page.排序 排序="-created_at"*
*page = > page.样式 样式=`首页CSS`*
*page = > page.头装配 表=`头资源`*
*page = > page.图片装配 表=`品牌图`*

*about = > 网页.页面 标题="关于" 引言="<h1>关于本站</h1><p>求道量子 是一个用 Marqdo 语言及其 web 扩展库（ext/web）构建的技术站点。</p><p>「求道」取义于对真理的探寻——叠加与纠缠是量子世界的入口，也是我们的起点。本站用 GFM 表格装配页面、SQLite 支撑数据、.mq.md 文档即代码，博客与论坛在同一套数据库中共生。</p><p>联系与建议：欢迎在讨论区发帖交流。</p>"*
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

*tags = > 网页.页面 标题="标签归档" 引言="<h1>标签归档</h1><p>按主题归档文章，点击标签查看对应文章。</p>"*
*tags = > tags.组件装配 组件=`首页`*
*tags = > tags.主体装配 主体=`标签列表`*
*tags = > tags.链接前缀 前缀="/tag/"*
*tags = > tags.样式 样式=`首页CSS`*
*tags = > tags.头装配 表=`头资源`*

*tagged = > 网页.页面 标题="标签"*
*tagged = > tagged.组件装配 组件=`首页`*
*tagged = > tagged.主体装配 主体=`列表`*
*tagged = > tagged.查询条件 条件=`标签条件`*
*tagged = > tagged.排序 排序="-created_at"*
*tagged = > tagged.样式 样式=`首页CSS`*
*tagged = > tagged.头装配 表=`头资源`*

*forum = > 网页.页面 标题="讨论区" 引言="<h1>讨论区</h1><p>量子技术的开放式交流：问题、书单、产业观察，畅所欲言。</p>"*
*forum = > forum.组件装配 组件=`首页`*
*forum = > forum.主体装配 主体=`论坛列表`*
*forum = > forum.排序 排序="-id"*
*forum = > forum.链接前缀 前缀="/forum/topic/"*
*forum = > forum.样式 样式=`首页CSS`*
*forum = > forum.头装配 表=`头资源`*

*topic_form = > 网页.表单 表="topics" 动作="插入"*
*topic_form = > topic_form.字段 字段=`主题字段`*
*topic_form = > topic_form.规则 规则=`主题规则`*

*forum_new = > 网页.页面 标题="发布主题" 引言="<h1>发布主题</h1><p>写下一个关于量子的问题或观点，与其他求道者交流。</p>"*
*forum_new = > forum_new.组件装配 组件=`首页`*
*forum_new = > forum_new.表单装配 表单=`topic_form` id="topic"*
*forum_new = > forum_new.样式 样式=`首页CSS`*
*forum_new = > forum_new.头装配 表=`头资源`*

*post_form = > 网页.表单 表="posts" 动作="插入"*
*post_form = > post_form.字段 字段=`发布字段`*
*post_form = > post_form.规则 规则=`发布规则`*

*publish = > 网页.页面 标题="发布文章" 引言="<h1>发布文章</h1><p>用 Markdown 撰写新文章：左侧编辑、右侧实时预览，发布后即出现在首页顶部。</p>"*
*publish = > publish.组件装配 组件=`首页`*
*publish = > publish.表单装配 表单=`post_form` id="post"*
*publish = > publish.样式 样式=`首页CSS`*
*publish = > publish.头装配 表=`发资源`*

*topic = > 网页.页面 标题="主题"*
*topic = > topic.组件装配 组件=`首页`*
*topic = > topic.主体装配 主体=`主题详情`*
*topic = > topic.查询条件 条件=`主题条件`*
*topic = > topic.详情 详情=True*
*topic = > topic.样式 样式=`首页CSS`*
*topic = > topic.头装配 表=`头资源`*

*app = > 网页.应用 页面=page 数据库=store 后台=True 主机="127.0.0.1" 端口=18085*
*app = > app.路由 路径="/about" 页面=about*
*app = > app.路由 路径="/post/{slug}" 页面=post*
*app = > app.路由 路径="/tags" 页面=tags*
*app = > app.路由 路径="/tag/{slug}" 页面=tagged*
*app = > app.路由 路径="/forum" 页面=forum*
*app = > app.路由 路径="/forum/new" 页面=forum_new*
*app = > app.路由 路径="/forum/topic/{tid}" 页面=topic*
*app = > app.路由 路径="/admin-publish" 页面=publish*
*app = > app.静态 目录="public" 挂载="/static"*
*app = > app.图标 表=`站点图标`*
*app = > app.鉴权 用户表=`管理员` 会话时长=3600*
*app = > app.门禁 路径="/_form/post" 角色="admin"*
> `app`.监听