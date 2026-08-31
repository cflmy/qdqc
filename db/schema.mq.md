qdqc 数据结构

求道量子站点的核心表：博客文章（posts / tags / post_tags）。topics / replies 为历史表，界面已下线讨论区。
`slug` 用于详情页 `/post/{slug}` 动态路由；`content` 存 Markdown 正文；`tag` 是主标签（tags 表 slug）。

## posts

文章主表结构。

`posts` =

| 字段 | 类型 | 可空 |
|------|------|------|
| id | integer | false |
| title | text | false |
| slug | text | false |
| summary | text | true |
| content | text | true |
| tag | text | true |
| created_at | text | true |
| updated_at | text | true |

**`posts`**

## tags

标签表结构。

`tags` =

| 字段 | 类型 | 可空 |
|------|------|------|
| id | integer | false |
| name | text | false |
| slug | text | false |

**`tags`**

## post_tags

文章-标签关联表结构。

`post_tags` =

| 字段 | 类型 | 可空 |
|------|------|------|
| id | integer | false |
| post_id | integer | false |
| tag_id | integer | false |

**`post_tags`**

## topics

论坛主题表结构。`author` 记录发帖人；论坛列表按 id 倒序，新帖置顶。

`topics` =

| 字段 | 类型 | 可空 |
|------|------|------|
| id | integer | false |
| title | text | false |
| summary | text | true |
| content | text | true |
| author | text | true |
| created_at | text | true |
| updated_at | text | true |

**`topics`**

## replies

论坛回复表结构。`topic_id` 指向主题；v1 由种子数据填充，回复发布留待 v2。

`replies` =

| 字段 | 类型 | 可空 |
|------|------|------|
| id | integer | false |
| topic_id | integer | false |
| author | text | true |
| content | text | true |
| created_at | text | true |

**`replies`**