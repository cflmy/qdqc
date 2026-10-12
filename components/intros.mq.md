---
title: components/intros
description: >-
  Page intro HTML (masthead / kicker / letters). Returned as HTML strings for
  kit.set_intro — no compose_intro.
---

各页英雄区 HTML。首页刊头与文章评论区含结构性 markup（masthead-guide / post-comments）。

## 首页引言

刊头左右分栏 + 三卷书架。

*"<div class='masthead-brand'><p class='kicker'>// Journal</p><h1>求道量子</h1><p class='lede slogan'>以求道之心，探量子之密。</p></div><aside class='masthead-guide' aria-label='导读'><p class='mg-label'>导读</p><p class='mg-blurb'>以求道之心，探量子之密。<a href='/about'>关于本刊</a></p><p class='mg-sub'>建议读序</p><ol class='mg-path'><li><a href='/column/linear-algebra'>线性代数</a></li><li><a href='/column/quantum-algorithms'>量子算法</a></li><li class='mg-path-soft'><a href='/column/marqdo'>Marqdo</a></li></ol><div class='mg-tags'><a class='side-tag' href='/tag/quantum'>量子基础</a><a class='side-tag' href='/tag/algorithm'>算法</a><a class='side-tag' href='/tag/hardware'>硬件</a><a class='side-tag' href='/tag/sci-pop'>科普</a><a class='side-tag' href='/tag/marqdo'>Marqdo</a></div><div id='mg-pins'></div></aside><section class='column-gate column-gate--shelf' aria-label='专栏入口'><p class='column-gate-label'>本刊三卷</p><ul class='column-gate-list'><li><a href='/column/marqdo'><div class='cg-media'><img src='/static/covers/vol-marqdo.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 01</span><span class='cg-name'>Marqdo 专栏</span><span class='cg-desc'>文档即代码，把站点写进 .mq.md</span></div></a></li><li><a href='/column/linear-algebra'><div class='cg-media'><img src='/static/covers/vol-linear-algebra.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 02</span><span class='cg-name'>线性代数专栏</span><span class='cg-desc'>向量与矩阵——量子语言的语法</span></div></a></li><li><a href='/column/quantum-algorithms'><div class='cg-media'><img src='/static/covers/vol-quantum.jpg' alt='' loading='lazy'></div><div class='cg-copy'><span class='cg-vol'>Vol. 03</span><span class='cg-name'>量子算法专栏</span><span class='cg-desc'>门线路、Shor / Grover 与纠错入门</span></div></a></li></ul><p class='column-gate-more'><a href='/columns'>进入专栏书架 →</a></p></section>"*

## 关于引言

*"<div class='about-doc'><p class='kicker'>// about</p><h1>关于本刊</h1><p class='lede slogan'>以求道之心，探量子之密。</p><p class='about-lead'>该怎么诉说看到你的兴奋呢？或许可以用下面不那么精准的话来形容：</p><ul class='about-verse'><li>漫漫长夜，曙光初升；</li><li>沉沉迷障，微光破暗；</li><li>悠悠求索，终遇同尘。</li></ul><p>欢迎你！求道者！更完整的见面礼，在开篇 <a href='/post/hello-qdqc'>Hello，求道者！</a>——这里是本刊的自我介绍。</p><h2>求道量子</h2><p><strong>QDQC</strong> 是 Quantum Dot Quantum Computing（量子点量子计算）的缩写。量子点量子计算和超导、光量子类似，是一种很有希望大规模化的实现方式。</p><p>尽管如此，求道量子并不打算成为量子点路线的坚定拥趸。考虑到量子计算仍处在 NISQ（含噪声中等规模量子）时代，本刊不打算、也绝不会只宣传一种技术路径——叠加、纠缠、线路、纠错与各家硬件，都会写；能核对、能复述，比站队更重要。</p><p>正因如此，我们将网站命名为求道量子。你也可以把它读作 Qode Quoc：Qode 源自 Quantum Code 的变体，承载代码与可执行知识的理念；Quoc 由缩写 QC 演化而来，读音与 Quark（夸克）相近。夸克作为物质的基本单元，恰好呼应本站求索量子本源的初心。有时也会笑称读作 code coze——中文里可解作「码扣」，正是 Marqdo 的中文名。</p><p>中国境内从事量子计算的企业不少，可相关内容仍常常零碎、不成体系，算不上好的发展生态。所以，求道者！不必感到迷茫——不管你对量子了解有多少，都再次诚挚地欢迎你。</p><h2>关于 Marqdo</h2><p>Marqdo 是求道量子使用的语言——这里的「使用」有多重含义。最直接的：你此刻看到的 <a href='https://qdqc.com'>求道量子官网</a>，就是用 Marqdo 搭起来的。</p><p>另一方面，Marqdo 还在不断完善量子计算相关的框架；未来它未尝不会成为量子计算的首选语言之一，因此本刊积极选用它，以免在浪潮里落伍。简略几条值得期待的特性（细节见 <a href='/post/hello-marqdo'>Hello，Marqdo!</a>、<a href='https://www.marqdo.com'>Marqdo 官网</a> 与 <a href='https://github.com/cflmy/marqdo'>GitHub</a>）：</p><ol class='about-path'><li><strong>代码即文档</strong>：源码后缀是 .mq.md，可被 Markdown 自然解析；借助 GFM 表格等语法，代码本身就好读。</li><li><strong>文档即知识库</strong>：设计参考 Open Knowledge Format（OKF），依赖关系可生成 yaml，让知识本身成为可执行的体系——对大模型辅助写算法尤其有用。</li><li><strong>易于审计的公式</strong>：公式可当作变量嵌入代码执行，写完跑一遍就能核对是否正确。</li><li><strong>高扩展、轻量 Jupyter</strong>：外联扩展库可用围栏执行非 Marqdo 代码并查看输出，却比传统 notebook 更轻、更适合 git。</li></ol><h2>专栏和新闻</h2><p>求道量子设了若干专栏与量子新闻，你可以自由阅读，把零碎信息慢慢织成一条线索：</p><ul class='about-volumes'><li><a href='/column/linear-algebra'><strong>线性代数专栏</strong></a>——向量与矩阵，量子语言的语法。可从 <a href='/post/la-why-vectors'>为什么量子计算需要向量</a> 开卷。</li><li><a href='/column/quantum-algorithms'><strong>量子算法专栏</strong></a>——从比特到线路，再到噪声里的防护。已有 <a href='/post/qubit-intro'>量子比特</a>、<a href='/post/superposition-entanglement'>叠加与纠缠</a>、<a href='/post/quantum-circuits'>从线路到算法</a>、<a href='/post/quantum-error-correction'>量子纠错</a>、<a href='/post/quantum-hardware'>硬件一览</a>。</li><li><a href='/column/marqdo'><strong>Marqdo 专栏</strong></a>——工具与表达。除上面两篇外，还有 <a href='/post/intro-to-marqdo'>用一本文档，搭起一个站点</a>。</li></ul><p>侧栏与 <a href='/news'>量子新闻</a> 是外链快讯，当作阅读时的背景音即可；文末「读者来信」欢迎讨论。</p><p>最后再次欢迎你，求道者！</p><p class='about-sign'>CFLMY 撰写——2026 年九月</p><p class='about-more'><a href='/post/hello-qdqc'>阅读开篇 Hello，求道者！ →</a><span class='comments-sep' aria-hidden='true'>·</span><a href='/columns'>专栏书架</a><span class='comments-sep' aria-hidden='true'>·</span><a href='/'>返回刊头</a></p></div>"*

## 文章引言

*"<section class='post-comments' aria-label='评论'><header class='comments-head'><p class='kicker'>// letters</p><h2 class='comments-title'>读者来信</h2><p class='comments-lede'>文末讨论栏 · 统一身份登录后即可回信</p></header><div id='comment-list' class='comment-list'></div><p id='comment-guest' class='comment-guest'>登录后即可参与讨论。<a href='/login'>统一身份登录</a><span class='comments-sep' aria-hidden='true'>·</span><a href='/register'>注册</a></p><div id='comment-form-mount' class='comment-compose'></div></section>"*

## 标签引言

*"<p class='kicker'>// index</p><h1>栏目索引</h1><p class='lede'>按主题浏览全部文章。</p>"*

## 专栏书架引言

*"<p class='kicker'>// library</p><h1>专栏书架</h1><p class='lede'>本刊三卷，按序开卷。</p>"*

## 新闻引言

*"<p class='kicker'>// brief</p><h1>量子新闻</h1><p class='lede'>来自 news 表的外链快讯，按发布时间倒序。</p>"*

## 开卷引言

*"<p class='kicker'>// volume</p><h1>开卷</h1><p class='lede'>本专栏目录。</p>"*

## 登录引言

*"<p class='kicker'>// account</p><h1>登录</h1><p class='lede'>正在跳转 CFLMY 统一身份认证…</p><p class='auth_switch'><a href='/oidc/login'>若未自动跳转，点此继续</a></p>"*

## 注册引言

*"<p class='kicker'>// account</p><h1>注册</h1><p class='lede'>账号在 CFLMY 统一身份创建；正在跳转…</p><p class='auth_switch'><a href='/oidc/register'>若未自动跳转，点此继续</a></p>"*

## 后台登录引言

*"<p class='kicker'>// desk</p><h1>进入写作台</h1><p class='lede'>使用 CFLMY 统一身份管理员账号进入后台。</p><p class='auth_switch'><a href='/oidc/login?next=/admin'>若未自动跳转，点此继续</a></p>"*

## 后台概览引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin' aria-current='page'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// desk</p><h1>写作台</h1><p class='lede'>文章、专栏、快讯、来信与界面设置，集中在此处理。</p><section class='admin-hub' aria-label='管理入口'><div class='admin-hub-grid'><a class='admin-hub-card' href='/admin/posts'><span class='admin-hub-kicker'>01 · Posts</span><strong>文章</strong><span>撰写与修订 Markdown 正文，发布后即时上刊。</span></a><a class='admin-hub-card' href='/admin/columns'><span class='admin-hub-kicker'>02 · Columns</span><strong>专栏</strong><span>维护书架卷册的名称、摘要、排序与连载状态。</span></a><a class='admin-hub-card' href='/admin/news'><span class='admin-hub-kicker'>03 · News</span><strong>新闻</strong><span>侧栏与 /news 页的量子快讯外链。</span></a><a class='admin-hub-card' href='/admin/comments'><span class='admin-hub-kicker'>04 · Letters</span><strong>评论</strong><span>审核读者来信，修改或删除不当内容。</span></a><a class='admin-hub-card' href='/admin/settings/1'><span class='admin-hub-kicker'>05 · UI</span><strong>界面</strong><span>登录入口开关，以及 ICP / 公安备案号悬挂。</span></a><a class='admin-hub-card admin-hub-card--mute' href='/'><span class='admin-hub-kicker'>00 · Site</span><strong>返回前台</strong><span>打开刊头与正文阅读栏。</span></a></div></section>"*

## 文章管理引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts' aria-current='page'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// posts</p><h1>文章管理</h1><p class='lede'>查看已发布文章，或撰写新稿。</p><div class='pub-compose-bar'><a class='pub-new-btn' href='/admin/posts/new'>撰写新稿</a><p class='pub-compose-hint'>Markdown 正文；发布后前台即时可读。</p></div><header class='pub-list-head'><h2>文章列表</h2><p>点击条目进入编辑。</p></header>"*

## 撰写新稿引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts' aria-current='page'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// posts</p><h1>撰写新稿</h1><p class='lede'>填写标题与正文后发布。<a class='admin-back' href='/admin/posts'>返回列表</a></p>"*

## 编辑文章引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts' aria-current='page'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// posts</p><h1>编辑文章</h1><p class='lede'>修改后保存即可更新前台。<a class='admin-back' href='/admin/posts'>返回列表</a></p>"*

## 专栏管理引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns' aria-current='page'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// columns</p><h1>专栏管理</h1><p class='lede'>维护书架上的专栏元数据。</p><div class='pub-compose-bar'><a class='pub-new-btn' href='/admin/columns/new'>新建专栏</a><p class='pub-compose-hint'>slug 须唯一，将用于 /column/{slug} 路径。</p></div><header class='pub-list-head'><h2>专栏列表</h2><p>点击条目编辑名称、摘要、排序与连载状态。</p></header>"*

## 新建专栏引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns' aria-current='page'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// columns</p><h1>新建专栏</h1><p class='lede'>填写 slug 与排序。<a class='admin-back' href='/admin/columns'>返回列表</a></p>"*

## 编辑专栏引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns' aria-current='page'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// columns</p><h1>编辑专栏</h1><p class='lede'>修改后保存即可更新专栏页。<a class='admin-back' href='/admin/columns'>返回列表</a></p>"*

## 新闻管理引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news' aria-current='page'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// news</p><h1>新闻管理</h1><p class='lede'>维护侧栏与 /news 页的量子快讯。</p><div class='pub-compose-bar'><a class='pub-new-btn' href='/admin/news/new'>新建快讯</a><p class='pub-compose-hint'>url 可为外链；published_at 留空则默认今天。</p></div><header class='pub-list-head'><h2>新闻列表</h2><p>点击条目编辑。</p></header>"*

## 新建快讯引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news' aria-current='page'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// news</p><h1>新建快讯</h1><p class='lede'>标题与原文链接必填。<a class='admin-back' href='/admin/news'>返回列表</a></p>"*

## 编辑快讯引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news' aria-current='page'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// news</p><h1>编辑快讯</h1><p class='lede'>修改后保存即可更新侧栏。<a class='admin-back' href='/admin/news'>返回列表</a></p>"*

## 评论管理引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments' aria-current='page'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// letters</p><h1>评论管理</h1><p class='lede'>审核读者来信；点击条目可修改或删除。</p><header class='pub-list-head'><h2>全部评论</h2><p>按时间倒序。</p></header>"*

## 编辑评论引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments' aria-current='page'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// letters</p><h1>编辑评论</h1><p class='lede'>修改后保存。<a class='admin-back' href='/admin/comments'>返回列表</a> · <a class='admin-danger' href='/admin/comments/delete/{id}'>删除这条评论</a></p>"*

## 删除评论引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments' aria-current='page'>评论</a><a href='/admin/settings/1'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// letters</p><h1>删除评论</h1><p class='lede'>确认后不可恢复。<a class='admin-back' href='/admin/comments/{id}'>返回编辑</a> · <a class='admin-back' href='/admin/comments'>返回列表</a></p>"*

## 界面开关引言

*"<nav class='admin-nav' aria-label='后台模块'><a href='/admin'>概览</a><a href='/admin/posts'>文章</a><a href='/admin/columns'>专栏</a><a href='/admin/news'>新闻</a><a href='/admin/comments'>评论</a><a href='/admin/settings/1' aria-current='page'>界面</a><a class='admin-nav-logout' href='/admin/logout'>退出</a></nav><p class='kicker'>// ui</p><h1>界面设置</h1><p class='lede'>控制前台登录 / 注册 / 评论入口（<code>1</code> 显示、<code>0</code> 隐藏，不影响实际路由）。ICP 与公安备案号留空则脚注不悬挂；填写完整文案后显示在页脚（链至工信部 / 公安备案查询站）。</p>"*
