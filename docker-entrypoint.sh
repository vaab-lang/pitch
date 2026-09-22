#!/bin/sh
set -eu

PORT="${PORT:-8787}"

case "$PORT" in
  ''|*[!0-9]*)
    echo "site: PORT must be a number (got: $PORT)" >&2
    exit 1
    ;;
esac

# Rewrite the listen port in main.vaab so Render/Fly env PORT works.
sed -i "s/serve on port [0-9][0-9]*/serve on port ${PORT}/" /home/site/app/main.vaab

echo "site: listening on port ${PORT}"
exec vaab serve /home/site/app/main.vaab
