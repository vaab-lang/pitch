#!/bin/sh
# Honour $PORT from Render / Cloud Run / Railway; Vaab needs a literal port.
set -eu

PORT="${PORT:-8787}"
case "$PORT" in
  ''|*[!0-9]*)
    echo "pitch: PORT must be a number (got: $PORT)" >&2
    exit 1
    ;;
esac

# Rewrite the serve port so the container listens where the host expects.
sed -i "s/serve on port [0-9][0-9]*/serve on port ${PORT}/" /home/pitch/app/main.vaab

echo "pitch: listening on port ${PORT}"
exec vaab serve /home/pitch/app/main.vaab
