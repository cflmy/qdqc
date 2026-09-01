qdqc 数据结构

求道量子站点的核心表：博客文章（posts / tags / post_tags）、专栏（columns）、量子新闻（news）。
topics / replies 为历史表，界面已下线讨论区。
`slug` 用于详情页 `/post/{slug}`；专栏归属与置顶由迁移写入 `column_slug` / `pinned`（见 db/migrate.mq.md）。
`tag` 是横切主标签，与专栏相互独立。

## posts

文章主表。`column_slug`（text）与 `pinned`（integer，1=置顶）由迁移 ALTER 追加，不在此建表字段中重复声明，以免新旧库冲突。

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

## columns

专栏表。编辑意图下的连载入口，不等于标签。

`columns` =

| 字段 | 类型 | 可空 |
|------|------|------|
| id | integer | false |
| name | text | false |
| slug | text | false |
| summary | text | true |
| sort_order | integer | true |
| status | text | true |
| created_at | text | true |

**`columns`**

## news

量子新闻 / 快讯。侧栏展示，与本站长文 posts 分离；url 可为外链。

`news` =

| 字段 | 类型 | 可空 |
|------|------|------|
| id | integer | false |
| title | text | false |
| url | text | false |
| source | text | true |
| summary | text | true |
| published_at | text | true |
| created_at | text | true |

**`news`**

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
