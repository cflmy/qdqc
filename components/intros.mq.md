---
title: components/intros
description: 表驱动页面引言（属性 / 值 / 样式）。装配：`页面.引言装配 引言=…`。
---

各页英雄区：眉题 / 标题 / 导语用属性表；样式列绑 `theme.*`。
首页刊头与文章评论区走 `原文`——框架靠 `masthead-guide` / `.post-comments`
套上既有杂志 CSS（`masthead-split`、书架封面），插槽表表达不了这层结构。
后台二级导航在 `admin.后台页脚`。

## 首页引言

刊头左右分栏 + 三卷书架。含 `masthead-guide` 时渲染层会给 `.main-intro` 加上 `masthead-split`。

**刊头 = "<div class='masthead-brand'><p class='kicker'>// Journal</p><h1>求道量子</h1><p class='lede slogan'>以求道之心，探量子之密。</p></div><aside class='masthead-guide' aria-label='导读'><p class='mg-label'>导读</p><p class='mg-blurb'>以求道之心，探量子之密。<a href='/about'>关于本刊</a></p><p class='mg-sub'>建议读序</p><ol class='mg-path'><li><a href='/column/linear-algebra'>线性代数</a></li><li><a href='/column/quantum-algorithms'>量子算法</a></li><li class='mg-path-soft'><a href='/column/marqdo'>Marqdo</a></li></ol><div class='mg-tags'><a class='side-tag' href='/tag/quantum'>量子基础</a><a class='side-tag' href='/tag/algorithm'>算法</a><a class='side-tag' href='/tag/hardware'>硬件</a><a class='side-tag' href='/tag/sci-pop'>科普</a><a class='side-tag' href='/tag/marqdo'>Marqdo</a></div><div id='mg-pins'></div></aside><section class='column-gate column-gate--shelf' aria-label='专栏入口'><p class='column-gate-label'>本刊三卷</p><ul class='column-gate-list'><li><a href='/column/marqdo'><div class='cg-media'><img src='/static/covers/vol-marqdo.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 01</span><span class='cg-name'>Marqdo 专栏</span><span class='cg-desc'>文档即代码，把站点写进 .mq.md</span></div></a></li><li><a href='/column/linear-algebra'><div class='cg-media'><img src='/static/covers/vol-linear-algebra.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 02</span><span class='cg-name'>线性代数专栏</span><span class='cg-desc'>向量与矩阵——量子语言的语法</span></div></a></li><li><a href='/column/quantum-algorithms'><div class='cg-media'><img src='/static/covers/vol-quantum.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 03</span><span class='cg-name'>量子算法专栏</span><span class='cg-desc'>门线路、Shor / Grover 与纠错入门</span></div></a></li></ul><p class='column-gate-more'><a href='/columns'>进入专栏书架 →</a></p></section>"**

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 原文 | `刊头` | |

*`表`*

## 关于引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // about | |
| 标题 | 关于本刊 | |
| 导语 | 求道量子，以求道之心，探量子之密。 | theme.`slogan` |
| 段落 | "我们关注可核对的概念、可复述的直觉，以及算法与硬件之间正在发生的事。内容按三条专栏组织：**Marqdo**（工具与表达）、**线性代数**（量子前置数学）、**量子算法**（门线路与算法入门）；标签仍作横切检索。正文采用论文阅读栏的版式。" | |

*`表`*

## 文章引言

读者来信区块（含 `#comment-list` / `#comment-form-mount`）；版式依赖 `.post-comments`。

**区 = "<section class='post-comments' aria-label='评论'><header class='comments-head'><p class='kicker'>// letters</p><h2 class='comments-title'>读者来信</h2><p class='comments-lede'>文末讨论栏 · 统一身份登录后即可回信</p></header><div id='comment-list' class='comment-list'></div><p id='comment-guest' class='comment-guest'>登录后即可参与讨论。<a href='/login'>统一身份登录</a><span class='comments-sep' aria-hidden='true'>·</span><a href='/register'>注册</a></p><div id='comment-form-mount' class='comment-compose'></div></section>"**

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 原文 | `区` | |

*`表`*

## 标签引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // index | |
| 标题 | 栏目索引 | |
| 导语 | 按主题浏览全部文章。 | |

*`表`*

## 专栏书架引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // library | |
| 标题 | 专栏书架 | |
| 导语 | 本刊三卷，按序开卷。 | |

*`表`*

## 新闻引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // brief | |
| 标题 | 量子新闻 | |
| 导语 | 来自 news 表的外链快讯，按发布时间倒序。 | |

*`表`*

## 开卷引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // volume | |
| 标题 | 开卷 | |
| 导语 | 本专栏目录。 | |

*`表`*

## 登录引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // account | |
| 标题 | 登录 | |
| 导语 | 正在跳转 CFLMY 统一身份认证… | |
| 段落 | "[若未自动跳转，点此继续](/oidc/login)" | theme.`auth_switch` |

*`表`*

## 注册引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // account | |
| 标题 | 注册 | |
| 导语 | 账号在 CFLMY 统一身份创建；正在跳转… | |
| 段落 | "[若未自动跳转，点此继续](/oidc/register)" | theme.`auth_switch` |

*`表`*

## 后台登录引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // admin | |
| 标题 | 后台登录 | |
| 导语 | 使用 CFLMY 统一身份管理员账号进入写作台。 | |
| 段落 | "[若未自动跳转，点此继续](/oidc/login?next=/admin)" | theme.`auth_switch` |

*`表`*

## 后台概览引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // admin | |
| 标题 | 后台管理 | |
| 导语 | 统一管理文章、专栏、新闻与读者评论。 | |
| 标签 | [文章 · 写作台](/admin/posts) | |
| 标签 | [专栏 · 元数据](/admin/columns) | |
| 标签 | [新闻 · 快讯](/admin/news) | |
| 标签 | [评论 · 来信](/admin/comments) | |

*`表`*

## 文章管理引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // posts | |
| 标题 | 文章管理 | |
| 导语 | 查看已发布文章，或撰写新稿。 | |
| 段落 | "[撰写新稿](/admin/posts/new)" | theme.`pub_new` |
| 段落 | Markdown 正文；发布后前台即时可读。 | theme.`pub_hint` |
| 小标题 | 文章列表 | |
| 段落 | 点击条目进入编辑。 | |

*`表`*

## 撰写新稿引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // posts | |
| 标题 | 撰写新稿 | |
| 导语 | "填写标题与正文后发布。[返回列表](/admin/posts)" | |

*`表`*

## 编辑文章引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // posts | |
| 标题 | 编辑文章 | |
| 导语 | "修改后保存即可更新前台。[返回列表](/admin/posts)" | |

*`表`*

## 专栏管理引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // columns | |
| 标题 | 专栏管理 | |
| 导语 | 维护书架上的专栏元数据。 | |
| 段落 | "[新建专栏](/admin/columns/new)" | theme.`pub_new` |
| 段落 | slug 须唯一，将用于 /column/{slug} 路径。 | theme.`pub_hint` |
| 小标题 | 专栏列表 | |
| 段落 | 点击条目编辑名称、摘要、排序与连载状态。 | |

*`表`*

## 新建专栏引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // columns | |
| 标题 | 新建专栏 | |
| 导语 | "填写 slug 与排序。[返回列表](/admin/columns)" | |

*`表`*

## 编辑专栏引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // columns | |
| 标题 | 编辑专栏 | |
| 导语 | "修改后保存即可更新专栏页。[返回列表](/admin/columns)" | |

*`表`*

## 新闻管理引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // news | |
| 标题 | 新闻管理 | |
| 导语 | 维护侧栏与 /news 页的量子快讯。 | |
| 段落 | "[新建快讯](/admin/news/new)" | theme.`pub_new` |
| 段落 | url 可为外链；published_at 留空则默认今天。 | theme.`pub_hint` |
| 小标题 | 新闻列表 | |
| 段落 | 点击条目编辑。 | |

*`表`*

## 新建快讯引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // news | |
| 标题 | 新建快讯 | |
| 导语 | "标题与原文链接必填。[返回列表](/admin/news)" | |

*`表`*

## 编辑快讯引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // news | |
| 标题 | 编辑快讯 | |
| 导语 | "修改后保存即可更新侧栏。[返回列表](/admin/news)" | |

*`表`*

## 评论管理引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // letters | |
| 标题 | 评论管理 | |
| 导语 | 审核读者来信；点击条目可修改或删除。 | |
| 小标题 | 全部评论 | |
| 段落 | 按时间倒序。 | |

*`表`*

## 编辑评论引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // letters | |
| 标题 | 编辑评论 | |
| 导语 | "修改后保存。[返回列表](/admin/comments) · [删除这条评论](/admin/comments/delete/{id})" | |

*`表`*

## 删除评论引言

`表` =

| 属性 | 值 | 样式 |
|------|-----|------|
| 眉题 | // letters | |
| 标题 | 删除评论 | |
| 导语 | "确认后不可恢复。[返回编辑](/admin/comments/{id}) · [返回列表](/admin/comments)" | |

*`表`*
