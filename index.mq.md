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
| "public/logo.png" | icon | "image/png" | any | "/icons/logo.png" |

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

**page = > 网页.页面 标题="求道量子" 引言="<div class='masthead-brand'><p class='kicker'>// Journal</p><h1>求道量子</h1><p class='lede slogan'>以求道之心，探量子之密。</p></div><aside class='masthead-guide' aria-label='导读'><p class='mg-label'>导读</p><p class='mg-blurb'>以求道之心，探量子之密。<a href='/about'>关于本刊</a></p><p class='mg-sub'>建议读序</p><ol class='mg-path'><li><a href='/column/linear-algebra'>线性代数</a></li><li><a href='/column/quantum-algorithms'>量子算法</a></li><li class='mg-path-soft'><a href='/column/marqdo'>Marqdo</a></li></ol><div class='mg-tags'><a class='side-tag' href='/tag/quantum'>量子基础</a><a class='side-tag' href='/tag/algorithm'>算法</a><a class='side-tag' href='/tag/hardware'>硬件</a><a class='side-tag' href='/tag/sci-pop'>科普</a><a class='side-tag' href='/tag/marqdo'>Marqdo</a></div><div id='mg-pins'></div></aside><section class='column-gate column-gate--shelf' aria-label='专栏入口'><p class='column-gate-label'>本刊三卷</p><ul class='column-gate-list'><li><a href='/column/marqdo'><div class='cg-media'><img src='/static/covers/vol-marqdo.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 01</span><span class='cg-name'>Marqdo 专栏</span><span class='cg-desc'>文档即代码，把站点写进 .mq.md</span></div></a></li><li><a href='/column/linear-algebra'><div class='cg-media'><img src='/static/covers/vol-linear-algebra.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 02</span><span class='cg-name'>线性代数专栏</span><span class='cg-desc'>向量与矩阵——量子语言的语法</span></div></a></li><li><a href='/column/quantum-algorithms'><div class='cg-media'><img src='/static/covers/vol-quantum.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 03</span><span class='cg-name'>量子算法专栏</span><span class='cg-desc'>门线路、Shor / Grover 与纠错入门</span></div></a></li></ul><p class='column-gate-more'><a href='/columns'>进入专栏书架 →</a></p></section>"**
**page = > page.组件装配 组件=`首页`**
**page = > 装刊壳 p=page**
**page = > page.主体装配 主体=`列表`**
**page = > page.排序 排序="-pinned,-created_at"**
**page = > page.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**page = > page.样式 样式=`首页CSS`**
**page = > page.图片装配 表=`品牌图`**

**about = > 网页.页面 标题="关于" 引言="<p class='kicker'>// about</p><h1>关于本刊</h1><p class='lede slogan'>求道量子，以求道之心，探量子之密。</p><p>我们关注可核对的概念、可复述的直觉，以及算法与硬件之间正在发生的事。内容按三条专栏组织：<strong>Marqdo</strong>（工具与表达）、<strong>线性代数</strong>（量子前置数学）、<strong>量子算法</strong>（门线路与算法入门）；标签仍作横切检索。正文采用论文阅读栏的版式。</p>"**
**about = > about.组件装配 组件=`首页`**
**about = > 装刊壳 p=about**
**about = > about.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**about = > about.样式 样式=`首页CSS`**

**post = > 网页.页面 标题="文章" 引言="<section class='post-comments' aria-label='评论'><header class='comments-head'><p class='comments-kicker'>// letters</p><h2 class='comments-title'>读者来信</h2><p class='comments-lede'>文末讨论栏 · 登录后即可回信</p></header><div id='comment-list' class='comment-list'></div><p id='comment-guest' class='comment-guest'>登录后即可参与讨论。<a href='/login'>登录</a><span class='comments-sep' aria-hidden='true'>·</span><a href='/register'>注册</a></p><div id='comment-form-mount' class='comment-compose'></div></section>"**
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

**tags = > 网页.页面 标题="标签归档" 引言="<p class='kicker'>// index</p><h1>栏目索引</h1><p class='lede'>按主题浏览全部文章。</p>"**
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

**columns = > 网页.页面 标题="专栏书架" 引言="<p class='kicker'>// library</p><h1>专栏书架</h1><p class='lede'>本刊三卷，按序开卷。</p>"**
**columns = > columns.组件装配 组件=`首页`**
**columns = > 装刊壳 p=columns**
**columns = > columns.主体装配 主体=`专栏列表`**
**columns = > columns.排序 排序="sort_order"**
**columns = > columns.链接前缀 前缀="/column/"**
**columns = > columns.列表装配 主体=`新闻轨列表` 排序="-published_at" 插槽="rail"**
**columns = > columns.样式 样式=`首页CSS`**

**news = > 网页.页面 标题="量子新闻" 引言="<p class='kicker'>// brief</p><h1>量子新闻</h1><p class='lede'>来自 SQLite news 表的外链快讯，按发布时间倒序。</p>"**
**news = > news.组件装配 组件=`首页`**
**news = > 装刊壳 p=news**
**news = > news.主体装配 主体=`新闻列表`**
**news = > news.排序 排序="-published_at"**
**news = > news.样式 样式=`首页CSS`**

**column = > 网页.页面 标题="开卷" 引言="<p class='kicker'>// volume</p><h1>开卷</h1><p class='lede'>本专栏目录。</p>"**
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
**post_form = > post_form.文案 提交="发布文章" 取消="返回列表" 取消链接="/desk/posts"**

**edit_form = > 网页.表单 表="posts" 动作="更新"**
**edit_form = > edit_form.字段 字段=`编辑字段`**
**edit_form = > edit_form.规则 规则=`编辑规则`**
**edit_form = > edit_form.文案 提交="保存文章" 取消="返回列表" 取消链接="/desk/posts"**

**column_form = > 网页.表单 表="columns" 动作="插入"**
**column_form = > column_form.字段 字段=`专栏发布字段`**
**column_form = > column_form.规则 规则=`专栏发布规则`**
**column_form = > column_form.文案 提交="创建专栏" 取消="返回列表" 取消链接="/desk/columns"**

**column_edit_form = > 网页.表单 表="columns" 动作="更新"**
**column_edit_form = > column_edit_form.字段 字段=`专栏编辑字段`**
**column_edit_form = > column_edit_form.规则 规则=`专栏编辑规则`**
**column_edit_form = > column_edit_form.文案 提交="保存专栏" 取消="返回列表" 取消链接="/desk/columns"**

**news_form = > 网页.表单 表="news" 动作="插入"**
**news_form = > news_form.字段 字段=`新闻发布字段`**
**news_form = > news_form.规则 规则=`新闻发布规则`**
**news_form = > news_form.文案 提交="发布快讯" 取消="返回列表" 取消链接="/desk/news"**

**news_edit_form = > 网页.表单 表="news" 动作="更新"**
**news_edit_form = > news_edit_form.字段 字段=`新闻编辑字段`**
**news_edit_form = > news_edit_form.规则 规则=`新闻编辑规则`**
**news_edit_form = > news_edit_form.文案 提交="保存快讯" 取消="返回列表" 取消链接="/desk/news"**

**login = > 网页.页面 标题="登录" 引言="<div class='auth-panel'><p class='kicker'>// account</p><h1>登录</h1><p class='lede'>使用账号登录后即可发表评论。管理后台请从页脚「管理」进入。</p><div id='auth-form-mount'></div><p class='auth-switch'>还没有账号？<a href='/register'>注册</a></p></div>"**
**login = > login.鉴权表单 动作="/login" 提交="登录" 表单id="site-login-form" 错误id="site-auth-err" 表单插槽="#auth-form-mount" 种类="login"**
**login = > login.组件装配 组件=`首页`**
**login = > 装刊壳 p=login**
**login = > login.样式 样式=`首页CSS`**

**register = > 网页.页面 标题="注册" 引言="<div class='auth-panel'><p class='kicker'>// account</p><h1>注册</h1><p class='lede'>创建读者账号，即可在文章页参与评论。</p><div id='auth-form-mount'></div><p class='auth-switch'>已有账号？<a href='/login'>登录</a></p></div>"**
**register = > register.鉴权表单 动作="/register" 提交="注册" 表单id="site-register-form" 错误id="site-auth-err" 表单插槽="#auth-form-mount" 种类="register"**
**register = > register.组件装配 组件=`首页`**
**register = > 装刊壳 p=register**
**register = > register.样式 样式=`首页CSS`**

**desk_login = > 网页.页面 标题="后台登录" 引言="<div class='desk-login'><p class='kicker'>// desk</p><h1>后台登录</h1><p class='lede'>管理员登录后进入写作台，管理文章、专栏与新闻。</p><div id='desk-auth-mount'></div><p class='auth-switch'><a href='/login'>返回读者登录</a></p></div>"**
**desk_login = > desk_login.鉴权表单 动作="/desk/login" 提交="进入后台" 表单id="desk-login-form" 错误id="desk-login-err" 表单插槽="#desk-auth-mount" 回跳="/desk" 种类="login"**
**desk_login = > 装刊壳 p=desk_login**
**desk_login = > desk_login.样式 样式=`写作台CSS`**

**desk_hub = > 网页.页面 标题="后台管理" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk' aria-current='page'>概览</a><a href='/desk/posts'>文章</a><a href='/desk/columns'>专栏</a><a href='/desk/news'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// desk</p><h1>后台管理</h1><p class='lede'>统一管理文章、专栏与量子新闻。</p><div class='admin-hub-grid'><a class='admin-hub-card' href='/desk/posts'><span class='admin-hub-kicker'>posts</span><strong>文章</strong><span>Markdown 写作台 · 发布与编辑长文</span></a><a class='admin-hub-card' href='/desk/columns'><span class='admin-hub-kicker'>columns</span><strong>专栏</strong><span>书架 Vol. 元数据 · slug 与排序</span></a><a class='admin-hub-card' href='/desk/news'><span class='admin-hub-kicker'>news</span><strong>新闻</strong><span>侧栏快讯 · 外链与发布日期</span></a><a class='admin-hub-card' href='/_rbac/desk'><span class='admin-hub-kicker'>rbac</span><strong>角色权限</strong><span>新建角色 · 勾选权限 · 赋给用户</span></a></div><p class='admin-hub-note'>需具备 desk:access；读者请使用顶栏登录，管理入口在页脚。</p>"**
**desk_hub = > desk_hub.组件装配 组件=admin.`后台壳`**
**desk_hub = > 装刊壳 p=desk_hub**
**desk_hub = > desk_hub.壳HTML 体类="desk-admin"**
**desk_hub = > desk_hub.样式 样式=`写作台CSS`**

**publish = > 网页.页面 标题="文章管理" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts' aria-current='page'>文章</a><a href='/desk/columns'>专栏</a><a href='/desk/news'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// posts</p><h1>文章管理</h1><p class='lede'>查看已发布文章，或撰写新稿。</p><div class='pub-compose-bar'><a class='pub-new-btn' href='/desk/posts/new'>撰写新稿</a><p class='pub-compose-hint'>Markdown 正文；发布后前台即时可读。</p></div><div class='pub-list-head'><h2>文章列表</h2><p>点击条目进入编辑。</p></div>"**
**publish = > publish.组件装配 组件=admin.`后台壳`**
**publish = > 装刊壳 p=publish**
**publish = > publish.壳HTML 体类="desk-admin desk-list"**
**publish = > publish.主体装配 主体=`管理列表`**
**publish = > publish.排序 排序="-updated_at"**
**publish = > publish.链接前缀 前缀="/desk/posts/"**
**publish = > publish.样式 样式=`写作台CSS`**

**publish_new = > 网页.页面 标题="撰写新稿" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts' aria-current='page'>文章</a><a href='/desk/columns'>专栏</a><a href='/desk/news'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// posts</p><h1>撰写新稿</h1><p class='lede'>填写标题与正文后发布。<a href='/desk/posts'>返回列表</a></p>"**
**publish_new = > publish_new.组件装配 组件=admin.`后台壳`**
**publish_new = > 装刊壳 p=publish_new**
**publish_new = > publish_new.壳HTML 体类="desk-admin desk-writing"**
**publish_new = > publish_new.表单装配 表单=`post_form` id="post"**
**publish_new = > publish_new.样式 样式=`写作台CSS`**

**publish_edit = > 网页.页面 标题="编辑文章" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts' aria-current='page'>文章</a><a href='/desk/columns'>专栏</a><a href='/desk/news'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// posts</p><h1>编辑文章</h1><p class='lede'>修改后保存即可更新前台。<a href='/desk/posts'>返回列表</a></p>"**
**publish_edit = > publish_edit.组件装配 组件=admin.`后台壳`**
**publish_edit = > 装刊壳 p=publish_edit**
**publish_edit = > publish_edit.壳HTML 体类="desk-admin desk-writing"**
**publish_edit = > publish_edit.表单装配 表单=`edit_form` id="post-edit"**
**publish_edit = > publish_edit.表单载入 表="posts"**
**publish_edit = > publish_edit.样式 样式=`写作台CSS`**

**admin_columns = > 网页.页面 标题="专栏管理" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts'>文章</a><a href='/desk/columns' aria-current='page'>专栏</a><a href='/desk/news'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// columns</p><h1>专栏管理</h1><p class='lede'>维护书架上的专栏元数据。</p><div class='pub-compose-bar'><a class='pub-new-btn' href='/desk/columns/new'>新建专栏</a><p class='pub-compose-hint'>slug 须唯一，将用于 /column/{slug} 路径。</p></div><div class='pub-list-head'><h2>专栏列表</h2><p>点击条目编辑名称、摘要、排序与连载状态。</p></div>"**
**admin_columns = > admin_columns.组件装配 组件=admin.`后台壳`**
**admin_columns = > 装刊壳 p=admin_columns**
**admin_columns = > admin_columns.壳HTML 体类="desk-admin desk-list"**
**admin_columns = > admin_columns.主体装配 主体=`专栏管理列表`**
**admin_columns = > admin_columns.排序 排序="sort_order"**
**admin_columns = > admin_columns.链接前缀 前缀="/desk/columns/"**
**admin_columns = > admin_columns.样式 样式=`写作台CSS`**

**admin_columns_new = > 网页.页面 标题="新建专栏" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts'>文章</a><a href='/desk/columns' aria-current='page'>专栏</a><a href='/desk/news'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// columns</p><h1>新建专栏</h1><p class='lede'>填写 slug 与排序。<a href='/desk/columns'>返回列表</a></p>"**
**admin_columns_new = > admin_columns_new.组件装配 组件=admin.`后台壳`**
**admin_columns_new = > 装刊壳 p=admin_columns_new**
**admin_columns_new = > admin_columns_new.壳HTML 体类="desk-admin desk-writing"**
**admin_columns_new = > admin_columns_new.表单装配 表单=`column_form` id="column"**
**admin_columns_new = > admin_columns_new.样式 样式=`写作台CSS`**

**admin_columns_edit = > 网页.页面 标题="编辑专栏" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts'>文章</a><a href='/desk/columns' aria-current='page'>专栏</a><a href='/desk/news'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// columns</p><h1>编辑专栏</h1><p class='lede'>修改后保存即可更新专栏页。<a href='/desk/columns'>返回列表</a></p>"**
**admin_columns_edit = > admin_columns_edit.组件装配 组件=admin.`后台壳`**
**admin_columns_edit = > 装刊壳 p=admin_columns_edit**
**admin_columns_edit = > admin_columns_edit.壳HTML 体类="desk-admin desk-writing"**
**admin_columns_edit = > admin_columns_edit.表单装配 表单=`column_edit_form` id="column-edit"**
**admin_columns_edit = > admin_columns_edit.表单载入 表="columns"**
**admin_columns_edit = > admin_columns_edit.样式 样式=`写作台CSS`**

**admin_news = > 网页.页面 标题="新闻管理" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts'>文章</a><a href='/desk/columns'>专栏</a><a href='/desk/news' aria-current='page'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// news</p><h1>新闻管理</h1><p class='lede'>维护侧栏与 /news 页的量子快讯。</p><div class='pub-compose-bar'><a class='pub-new-btn' href='/desk/news/new'>新建快讯</a><p class='pub-compose-hint'>url 可为外链；published_at 留空则默认今天。</p></div><div class='pub-list-head'><h2>新闻列表</h2><p>点击条目编辑。</p></div>"**
**admin_news = > admin_news.组件装配 组件=admin.`后台壳`**
**admin_news = > 装刊壳 p=admin_news**
**admin_news = > admin_news.壳HTML 体类="desk-admin desk-list"**
**admin_news = > admin_news.主体装配 主体=`新闻管理列表`**
**admin_news = > admin_news.排序 排序="-published_at"**
**admin_news = > admin_news.链接前缀 前缀="/desk/news/"**
**admin_news = > admin_news.样式 样式=`写作台CSS`**

**admin_news_new = > 网页.页面 标题="新建快讯" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts'>文章</a><a href='/desk/columns'>专栏</a><a href='/desk/news' aria-current='page'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// news</p><h1>新建快讯</h1><p class='lede'>标题与原文链接必填。<a href='/desk/news'>返回列表</a></p>"**
**admin_news_new = > admin_news_new.组件装配 组件=admin.`后台壳`**
**admin_news_new = > 装刊壳 p=admin_news_new**
**admin_news_new = > admin_news_new.壳HTML 体类="desk-admin desk-writing"**
**admin_news_new = > admin_news_new.表单装配 表单=`news_form` id="news"**
**admin_news_new = > admin_news_new.样式 样式=`写作台CSS`**

**admin_news_edit = > 网页.页面 标题="编辑快讯" 引言="<nav class='admin-nav' aria-label='后台导航'><a href='/desk'>概览</a><a href='/desk/posts'>文章</a><a href='/desk/columns'>专栏</a><a href='/desk/news' aria-current='page'>新闻</a><a class='admin-nav-logout' href='/_mg/logout'>退出</a></nav><p class='kicker'>// news</p><h1>编辑快讯</h1><p class='lede'>修改后保存即可更新侧栏。<a href='/desk/news'>返回列表</a></p>"**
**admin_news_edit = > admin_news_edit.组件装配 组件=admin.`后台壳`**
**admin_news_edit = > 装刊壳 p=admin_news_edit**
**admin_news_edit = > admin_news_edit.壳HTML 体类="desk-admin desk-writing"**
**admin_news_edit = > admin_news_edit.表单装配 表单=`news_edit_form` id="news-edit"**
**admin_news_edit = > admin_news_edit.表单载入 表="news"**
**admin_news_edit = > admin_news_edit.样式 样式=`写作台CSS`**

**app = > 网页.应用 页面=page 数据库=store 后台=True 后台前缀="/_mg" 登录回跳="/" 登出回跳="/login" 壳样式="minimal" 资源版本="20260918c" 主机="0.0.0.0" 端口=18085**
**app = > app.路由 路径="/about" 页面=about**
**app = > app.路由 路径="/post/{slug}" 页面=post**
**app = > app.路由 路径="/tags" 页面=tags**
**app = > app.路由 路径="/tag/{slug}" 页面=tagged**
**app = > app.路由 路径="/columns" 页面=columns**
**app = > app.路由 路径="/column/{slug}" 页面=column**
**app = > app.路由 路径="/news" 页面=news**
**app = > app.路由 路径="/login" 页面=login**
**app = > app.路由 路径="/register" 页面=register**
**app = > app.路由 路径="/desk/login" 页面=desk_login**
**app = > app.路由 路径="/desk" 页面=desk_hub**
**app = > app.路由 路径="/desk/posts" 页面=publish**
**app = > app.路由 路径="/desk/posts/new" 页面=publish_new**
**app = > app.路由 路径="/desk/posts/{id}" 页面=publish_edit**
**app = > app.路由 路径="/desk/columns" 页面=admin_columns**
**app = > app.路由 路径="/desk/columns/new" 页面=admin_columns_new**
**app = > app.路由 路径="/desk/columns/{id}" 页面=admin_columns_edit**
**app = > app.路由 路径="/desk/news" 页面=admin_news**
**app = > app.路由 路径="/desk/news/new" 页面=admin_news_new**
**app = > app.路由 路径="/desk/news/{id}" 页面=admin_news_edit**
**app = > app.重定向 来源="/admin-publish" 目标="/desk/posts" 永久=真**
**app = > app.重定向 来源="/admin-edit" 目标="/desk/posts" 永久=真**
**app = > app.重定向 来源="/admin" 目标="/desk" 永久=真**
**app = > app.重定向 来源="/admin/login" 目标="/desk/login" 永久=真**
**app = > app.重定向 来源="/admin/logout" 目标="/_mg/logout" 永久=真**
**app = > app.重定向 来源="/admin/posts" 目标="/desk/posts" 永久=真**
**app = > app.重定向 来源="/admin/columns" 目标="/desk/columns" 永久=真**
**app = > app.重定向 来源="/admin/news" 目标="/desk/news" 永久=真**
**app = > app.重定向 来源="/_auth/login" 目标="/desk/login" 永久=真**
**app = > app.重定向 来源="/_auth/logout" 目标="/_mg/logout" 永久=真**
**app = > app.挂载表单 id="post-edit" 表单=`edit_form`**
**app = > app.挂载表单 id="column-edit" 表单=`column_edit_form`**
**app = > app.挂载表单 id="news-edit" 表单=`news_edit_form`**
**app = > app.挂载表单 id="comment" 表单=`comment_form`**
**app = > app.装配 接口=`站点接口`**
**app = > app.静态 目录="public" 挂载="/static"**
**app = > app.图标 表=`站点图标`**
**app = > app.启用权限**
**app = > app.门禁 路径="/_mg" 权限="desk:access" 匹配="prefix" 拒绝="redirect" 排除="/_mg/login"**
**app = > app.鉴权 用户表=`管理员` 会话时长=3600 登录路径="/login" 登录回跳="/" 登出回跳="/login" 注册=真 注册路径="/register" 默认角色="member" 会话地址=session_url**
**app = > app.门禁 路径="/desk" 权限="desk:access" 匹配="prefix" 拒绝="redirect" 排除="/desk/login,/login,/register"**
**app = > app.门禁 路径="/_rbac" 权限="roles:manage" 匹配="prefix" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/post" 权限="posts:edit" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/post-edit" 权限="posts:edit" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/column" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/column-edit" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/news" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/news-edit" 权限="desk:access" 匹配="exact" 拒绝="redirect"**
**app = > app.门禁 路径="/_form/comment" 权限="comments:create" 匹配="exact" 拒绝="redirect"**
> `app`.监听
