#!/bin/sh
set -eu

PORT="${PORT:-8787}"
APP="${APP:-site}"

case "$PORT" in
  ''|*[!0-9]*)
    echo "site: PORT must be a number (got: $PORT)" >&2
    exit 1
    ;;
esac

case "$APP" in
  site)
    MAIN="/home/site/app/main.vaab"
    ;;
  riff)
    MAIN="/home/site/app/main-riff.vaab"
    ;;
  *)
    echo "site: APP must be site or riff (got: $APP)" >&2
    exit 1
    ;;
esac

sed -i "s/serve on port [0-9][0-9]*/serve on port ${PORT}/" "$MAIN"

echo "site: app=${APP} listening on port ${PORT}"
exec vaab serve "$MAIN"
