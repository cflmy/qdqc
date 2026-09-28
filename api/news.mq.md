---
type: endpoint
method: GET
path: /api/news
request: none
response: json
auth: none
description: List quantum news JSON by published_at.
import data:ext/data/db.mq.md
import sys:lib/sys.mq.md
---

# main

> sys.load_dotenv path=".env"
**url = > sys.env_get name="QDQC_DATABASE_URL"**
1. url == None
  **url = "sqlite:data/qdqc.db"**
**store = > data.db url=url**
**rows = > `store`.select table="news" order="-published_at" limit=40**
*rows*
