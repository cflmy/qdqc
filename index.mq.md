---
类型: 网页
标题: 求道量子
路由: /
方法: GET
数据源: posts
排序: -pinned,-created_at
description: >-
  首页 Document（ADR 0007）。运行时由 serve.mq.md 装配刊头壳、新闻轨与 WASM 客户端；
  本文件是文档与 EKC 投影，不是 listen 扫描入口。
---

# 求道量子

以求道之心，探量子之密。

本站用 Marqdo Web Artifact：Document / Endpoint / Resource。入口是 `serve.mq.md`
（`web.app` + 显式路由），页面袋由 `site/site.mq.md` + `site/kit.mq.md` 戳记，
禁止 `compose_*` / `app.configure`。
