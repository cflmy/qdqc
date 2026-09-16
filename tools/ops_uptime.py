#!/usr/bin/env python3
"""Append one uptime/latency sample for Industry ops evidence.

Does NOT log visitor IPs (outbound probe only). For full access logs, put a
reverse proxy in front and retain Combined/JSON logs separately (see docs/OPS-METRICS.md).

Usage:
  python3 tools/ops_uptime.py
  python3 tools/ops_uptime.py --base https://qdqc.com --out ops/uptime.jsonl
  python3 tools/ops_uptime.py --base http://127.0.0.1:18085
"""
from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


def probe(url: str, timeout: float) -> dict:
    t0 = time.perf_counter()
    code = 0
    err = ""
    bytes_len = 0
    try:
        req = urllib.request.Request(url, method="GET", headers={"User-Agent": "qdqc-ops-uptime/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read(65536)
            code = resp.status
            bytes_len = len(body)
    except urllib.error.HTTPError as e:
        code = e.code
        err = f"http_error:{e.code}"
    except Exception as e:  # noqa: BLE001 — ops probe must never crash cron
        err = type(e).__name__ + ":" + str(e)[:160]
    ms = round((time.perf_counter() - t0) * 1000.0, 1)
    return {
        "ts": datetime.now(timezone.utc).isoformat(),
        "url": url,
        "status": code,
        "latency_ms": ms,
        "bytes": bytes_len,
        "ok": code == 200,
        "error": err,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description="Append qdqc uptime sample")
    ap.add_argument("--base", default="https://qdqc.com", help="Site origin")
    ap.add_argument("--path", default="/", help="Path to GET")
    ap.add_argument("--out", default="ops/uptime.jsonl", help="Append JSONL path")
    ap.add_argument("--timeout", type=float, default=12.0)
    args = ap.parse_args()

    base = args.base.rstrip("/")
    path = args.path if args.path.startswith("/") else "/" + args.path
    url = base + path
    sample = probe(url, args.timeout)

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("a", encoding="utf-8") as f:
        f.write(json.dumps(sample, ensure_ascii=False) + "\n")

    mark = "OK" if sample["ok"] else "FAIL"
    print(f"{mark}  {sample['ts']}  status={sample['status']}  {sample['latency_ms']}ms  -> {out}")
    if sample["error"]:
        print(f"  error={sample['error']}")
    return 0 if sample["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
