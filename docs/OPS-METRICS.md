# Ops metrics for Industry evidence

## Do we need access logs?

**Yes, for Industry Track**—reviewers may ask for signals beyond “we deployed.”
We distinguish two layers:

| Layer | What it proves | Status |
|-------|----------------|--------|
| **Uptime probes** (this repo) | Site answers HTTP 200 over time | **Added** (`tools/ops_uptime.py`) |
| **Visitor access logs** | Real traffic volume / paths | **Optional**—add reverse proxy when needed |

Do **not** invent visit counters. Prefer falsifiable files under `ops/`.

## Uptime probe (no visitor PII)

```bash
# one sample (production)
python3 tools/ops_uptime.py --base https://qdqc.com --out ops/uptime.jsonl

# local docker
python3 tools/ops_uptime.py --base http://127.0.0.1:18085

# summarize for the paper
python3 tools/ops_summary.py
```

Cron example (every 5 minutes on the deploy host):

```cron
*/5 * * * * cd /path/to/qdqc && python3 tools/ops_uptime.py --base https://qdqc.com >>ops/cron.out 2>&1
```

`ops/*.jsonl` is gitignored. Keep raw samples on the server; commit only
`ops_summary` numbers into the thesis paper when stable.

## Full access logs (when you need path/hit counts)

Put **Caddy** or **nginx** in front of the Marqdo container and enable JSON or
Combined logs to a volume. Hash or truncate client IPs if you retain logs.
Marqdo `ext/web` does not currently ship an access-log middleware; reverse-proxy
logging is the least invasive production approach.

## Privacy

- Uptime probes only record: timestamp, URL, status, latency, byte sample size.
- No cookies, bodies, or client IPs.
- Access-log retention (if enabled) must follow your ICP/privacy obligations.
