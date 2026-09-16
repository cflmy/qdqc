# ops/

Runtime evidence for Industry Track (uptime JSONL, optional access logs).

- Generate: `python3 tools/ops_uptime.py --base https://qdqc.com`
- Summarize: `python3 tools/ops_summary.py`
- See [docs/OPS-METRICS.md](../docs/OPS-METRICS.md)

`*.jsonl` here is gitignored; do not commit raw logs with visitor data.
