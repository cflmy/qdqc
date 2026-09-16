# Public site & paper evidence

| Item | Value |
|------|--------|
| Production URL | **https://qdqc.com** |
| Source | **https://github.com/cflmy/qdqc** |
| ICP filing | **In progress** — wait for formal launch |
| Checkpoint | **Paused 2026-09-16** until qdqc.com live |
| Stack | Marqdo `ext/web` (GFM table-driven) |
| Local Docker | see [DEPLOY.md](../DEPLOY.md) → http://127.0.0.1:18085 |

Used as the **Industry Track** deployment artifact for The Web Conference 2027
(Track D thesis docs). Site network under qdqc.com:

| Site | URL | Role |
|------|-----|------|
| 求道量子 | https://qdqc.com | Primary Industry artifact |
| 求道启程 | https://edu.qdqc.com | 考研/考公信息公开（Marqdo 同方言第二站；见 `edu` 仓） |

Thesis checklist (source of truth for authors):
`MarqdoThesis/.../docs/07-industry-deployment-facts.md`

## Ops metrics

See [OPS-METRICS.md](OPS-METRICS.md): uptime probes (`tools/ops_uptime.py`) for
Industry evidence; full visitor access logs via reverse proxy when needed.
