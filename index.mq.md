---
title: 求道量子
description: 求道量子 · 专注量子技术科普与分享：博客文章、标签归档与登录门禁后台。
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
| stylesheet | "/static/brand-motion.css?v=6" | | | | | |
| script | "/static/theme.js?v=6" | | | | | |

`发资源` =

| 关系 | 地址 | 类型 | 尺寸 | 媒体 | 作为 | 跨域 |
|------|------|------|------|------|------|------|
| stylesheet | "/static/brand-motion.css?v=6" | | | | | |
| script | "/static/theme.js?v=6" | | | | | |
| stylesheet | "/static/editor.css?v=14" | | | | | |
| script | "/static/editor.js?v=14" | | | | | |

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

*page = > 网页.页面 标题="求道量子" 引言="<p class='kicker'>// quantum journal · vol.01</p><h1>求道量子</h1><p class='lede'>一份面向公众的量子技术读物：把叠加、纠缠与算法写清楚。</p>"*
*page = > page.组件装配 组件=`首页`*
*page = > page.主体装配 主体=`列表`*
*page = > page.排序 排序="-created_at"*
*page = > page.样式 样式=`首页CSS`*
*page = > page.头装配 表=`头资源`*
*page = > page.图片装配 表=`品牌图`*

*about = > 网页.页面 标题="关于" 引言="<p class='kicker'>// about</p><h1>关于本刊</h1><p class='lede'>求道量子是一份科技杂志式的量子科普读物。</p><p>我们关注可核对的概念、可复述的直觉，以及算法与硬件之间正在发生的事。文章按期刊目录编排，正文采用论文阅读栏的版式，方便慢慢读。</p>"*
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
*tagged = > tagged.排序 排序="-created_at"*
*tagged = > tagged.样式 样式=`首页CSS`*
*tagged = > tagged.头装配 表=`头资源`*

*post_form = > 网页.表单 表="posts" 动作="插入"*
*post_form = > post_form.字段 字段=`发布字段`*
*post_form = > post_form.规则 规则=`发布规则`*

*publish = > 网页.页面 标题="发布文章" 引言="<h1>写作台</h1><p class='lede'>左侧编辑、右侧预览；发布后出现在首页顶部。</p>"*
*publish = > publish.组件装配 组件=`首页`*
*publish = > publish.表单装配 表单=`post_form` id="post"*
*publish = > publish.样式 样式=`首页CSS`*
*publish = > publish.头装配 表=`发资源`*

*app = > 网页.应用 页面=page 数据库=store 后台=True 主机="127.0.0.1" 端口=18085*
*app = > app.路由 路径="/about" 页面=about*
*app = > app.路由 路径="/post/{slug}" 页面=post*
*app = > app.路由 路径="/tags" 页面=tags*
*app = > app.路由 路径="/tag/{slug}" 页面=tagged*
*app = > app.路由 路径="/admin-publish" 页面=publish*
*app = > app.静态 目录="public" 挂载="/static"*
*app = > app.图标 表=`站点图标`*
*app = > app.鉴权 用户表=`管理员` 会话时长=3600*
*app = > app.门禁 路径="/_form/post" 角色="admin"*
> `app`.监听
