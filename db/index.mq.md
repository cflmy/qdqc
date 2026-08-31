---
title: db/index
description: 打开 sqlite、建五张表、幂等种子。
导入 网页:ext/web/网页.mq.md
import schema:schema.mq.md
import seed:seed.mq.md
---

## 打开

*store = > 网页.数据库 地址="sqlite:data/qdqc.db"*
*字段 = > schema.posts*
*标签字段 = > schema.tags*
*关联字段 = > schema.post_tags*
*主题字段 = > schema.topics*
*回复字段 = > schema.replies*
> `store`.初始化 名=posts 字段=`字段`
> `store`.初始化 名=tags 字段=`标签字段`
> `store`.初始化 名=post_tags 字段=`关联字段`
> `store`.初始化 名=topics 字段=`主题字段`
> `store`.初始化 名=replies 字段=`回复字段`
*行 = > store.查询 表="posts" 上限=1*
1. `行`
  **store**
2. *
  *文章 = > seed.posts*
  *标签 = > seed.tags*
  *关联 = > seed.post_tags*
  *主题 = > seed.topics*
  *回复 = > seed.replies*
  > `store`.插入 表=posts 行=`文章`
  > `store`.插入 表=tags 行=`标签`
  > `store`.插入 表=post_tags 行=`关联`
  > `store`.插入 表=topics 行=`主题`
  > `store`.插入 表=replies 行=`回复`
  **store**