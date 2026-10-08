#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
echo '=== ps ==='
sudo docker compose ps -a
echo '=== logs ==='
sudo docker compose logs --tail=200 qdqc
echo '=== inspect ==='
sudo docker inspect qdqc --format 'status={{.State.Status}} exit={{.State.ExitCode}} oom={{.State.OOMKilled}} err={{.State.Error}} started={{.State.StartedAt}} finished={{.State.FinishedAt}} health={{if .State.Health}}{{.State.Health.Status}}{{else}}n/a{{end}}'
echo '=== inside listen ==='
sudo docker exec qdqc sh -c 'ss -lntp 2>/dev/null || netstat -lntp 2>/dev/null; ps aux; ls -la /app/.env /opt/marqdo/ext/native 2>&1 | head' || true
echo '=== host 18085 ==='
ss -lntp | grep 18085 || echo '(nothing on 18085)'
echo '=== curl ==='
curl -fsS -m 3 -o /dev/null -w 'HTTP %{http_code}\n' http://127.0.0.1:18085/ || true
