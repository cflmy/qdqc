---
type: Constraint
title: No compose_* / app.configure / feature deletion
status: accepted
date: 2026-09-28
---

# Constraint: ADR 0007 author surface + feature freeze

**Must not:**

- Call or reintroduce `compose_*`, `引言装配`, `组件装配`, `主体装配`, `列表装配`, `表单装配`
- Use `app.configure` junk-drawer APIs
- Author `ensure_plugin` / `host_*`
- Delete routes or capabilities (home, posts, tags, columns, news, comments, admin CRUD,
  OIDC, redirects, `/api/*`, KaTeX, theme WASM client)

**Must:**

- Prefer GFM tables + `table.put` / named kit helpers
- One language API per `.mq.md` (EN serve/kit/db/styles assembly; ZH Document metadata OK)
- Keep HTTP behavior equivalent to the pre-1.3 site
