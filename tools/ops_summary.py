#!/usr/bin/env python3
"""Summarize ops/uptime.jsonl for Industry paper tables.

Usage:
  python3 tools/ops_summary.py
  python3 tools/ops_summary.py --in ops/uptime.jsonl
"""
from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="inp", default="ops/uptime.jsonl")
    args = ap.parse_args()
    path = Path(args.inp)
    if not path.is_file():
        print(f"missing {path} — run: python3 tools/ops_uptime.py --base https://qdqc.com")
        return 1

    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        rows.append(json.loads(line))

    n = len(rows)
    ok = sum(1 for r in rows if r.get("ok"))
    statuses = Counter(int(r.get("status") or 0) for r in rows)
    lats = [float(r["latency_ms"]) for r in rows if r.get("ok")]
    avg = sum(lats) / len(lats) if lats else None
    p95 = sorted(lats)[int(0.95 * (len(lats) - 1))] if len(lats) >= 2 else (lats[0] if lats else None)

    print(f"samples={n}")
    print(f"ok={ok}  uptime_pct={100.0 * ok / n:.2f}%" if n else "uptime_pct=n/a")
    print(f"status_counts={dict(statuses)}")
    if avg is not None:
        print(f"latency_ms_avg={avg:.1f}  latency_ms_p95={p95:.1f}")
    print(f"first_ts={rows[0].get('ts')}  last_ts={rows[-1].get('ts')}")
    print()
    print("LaTeX sketch:")
    pct = f"{100.0 * ok / n:.1f}\\%" if n else "n/a"
    print(
        f"  Probe samples $n={n}$, HTTP 200 rate {pct}"
        + (f", mean latency ${avg:.0f}$\,ms" if avg is not None else "")
        + "."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
