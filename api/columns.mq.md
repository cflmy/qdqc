---
type: endpoint
method: GET
path: /api/columns
request: none
response: json
auth: none
description: List columns JSON ordered by sort_order.
import data:ext/data/db.mq.md
import sys:lib/sys.mq.md
---

# main

> sys.load_dotenv path=".env"
**url = > sys.env_get name="QDQC_DATABASE_URL"**
1. url == None
  **url = "sqlite:data/qdqc.db"**
**store = > data.db url=url**
**rows = > `store`.select table="columns" order="sort_order" limit=50**
*rows*
