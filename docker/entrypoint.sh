#!/bin/sh
set -eu
mkdir -p /app/data
echo "entrypoint: starting: $*" >&2
exec "$@"
