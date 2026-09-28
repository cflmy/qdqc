---
title: db/index
description: >-
  Open database (default sqlite; QDQC_DATABASE_URL for Postgres), optional
  QDQC_REDIS_URL session store, init schema, migrate, idempotent seed.
import data:ext/data/db.mq.md
import sys:lib/sys.mq.md
import schema:schema.mq.md
import seed:seed.mq.md
import migrate:migrate.mq.md
---

## open

> sys.load_dotenv path=".env"
**url = > sys.env_get name="QDQC_DATABASE_URL"**
1. url == None
    **url = "sqlite:data/qdqc.db"**
**store = > data.db url=url**
**fields = > schema.posts**
**column_fields = > schema.columns**
**news_fields = > schema.news**
**tag_fields = > schema.tags**
**link_fields = > schema.post_tags**
**topic_fields = > schema.topics**
**reply_fields = > schema.replies**
**comment_fields = > schema.comments**
> `store`.init name=posts fields=`fields`
> `store`.init name=columns fields=`column_fields`
> `store`.init name=news fields=`news_fields`
> `store`.init name=tags fields=`tag_fields`
> `store`.init name=post_tags fields=`link_fields`
> `store`.init name=topics fields=`topic_fields`
> `store`.init name=replies fields=`reply_fields`
> `store`.init name=comments fields=`comment_fields`
**steps = > migrate.steps**
1. url == "sqlite:data/qdqc.db"
    > `store`.migrate steps=`steps`
**has_posts = > store.select table="posts" limit=1**
**has_news = > store.select table="news" limit=1**
1. `has_posts`
2. *
  **articles = > seed.posts**
  **tags = > seed.tags**
  **links = > seed.post_tags**
  **topics = > seed.topics**
  **replies = > seed.replies**
  > `store`.insert table=posts rows=`articles`
  > `store`.insert table=tags rows=`tags`
  > `store`.insert table=post_tags rows=`links`
  > `store`.insert table=topics rows=`topics`
  > `store`.insert table=replies rows=`replies`
1. `has_news`
2. *
  **news = > seed.news**
  > `store`.insert table=news rows=`news`
*store*

## session_url

**url = > sys.env_get name="QDQC_REDIS_URL"**
*url*
