---
type: Decision
title: Artifact split with serve.mq.md entry
status: accepted
date: 2026-09-28
---

# Decision: serve.mq.md entry, not web.serve scan

qdqc keeps magazine chrome (nav brand, news rail, forms, OIDC, gates, KaTeX, WASM client).
Plain `web.serve` Document scan only stamps `data_source` / Markdown intro — that would
**degrade** the site.

**Decision:** Entry is English `serve.mq.md` using `web.app` + explicit `web.route`.
`pages/*.mq.md` and root `index.mq.md` are Document artifacts for humans/EKC; they are
**not** listen-scanned. Page bags are built in `site/site.mq.md` via `site/kit.mq.md`
`table.put` stamps (never `compose_*`).
