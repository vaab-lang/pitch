#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATA="$ROOT/benchmarks/.data"
VAAB="${VAAB:-$ROOT/../vaab/target/release/vaab}"
NODE="${NODE:-node}"
RUNS="${RUNS:-5}"

mkdir -p "$DATA"
rm -f "$DATA"/* 2>/dev/null || true

if [[ ! -x "$VAAB" ]]; then
  echo "vaab binary not found at $VAAB" >&2
  exit 1
fi

python3 - <<'PY' &
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

class Health(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"ok")
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, *_args):
        return

server = HTTPServer(("127.0.0.1", 9998), Health)
server.serve_forever()
PY
HTTP_PID=$!
cleanup() { kill "$HTTP_PID" 2>/dev/null || true; }
trap cleanup EXIT

time_ms() {
  python3 - "$@" <<'PY'
import subprocess
import sys
import time

command = sys.argv[1:]
start = time.perf_counter()
subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
elapsed = (time.perf_counter() - start) * 1000
print(f"{elapsed:.1f}")
PY
}

avg() {
  python3 - "$@" <<'PY'
import sys
values = [float(v) for v in sys.argv[1:]]
print(f"{sum(values) / len(values):.1f}")
PY
}

bench_pair() {
  local name="$1"
  local vaab_file="$2"
  local node_file="$3"
  local vaab_times=()
  local node_times=()

  for ((i = 1; i <= RUNS; i++)); do
    rm -f "$DATA"/* 2>/dev/null || true
    vaab_times+=("$(time_ms "$VAAB" run "$ROOT/benchmarks/$vaab_file")")
    rm -f "$DATA"/* 2>/dev/null || true
    node_times+=("$(time_ms "$NODE" --experimental-strip-types "$ROOT/benchmarks/$node_file")")
  done

  local vaab_avg node_avg
  vaab_avg="$(avg "${vaab_times[@]}")"
  node_avg="$(avg "${node_times[@]}")"
  printf '%s vaab=%s node=%s\n' "$name" "$vaab_avg" "$node_avg"
}

echo "Running $RUNS iterations per workload..."
bench_pair json json.vaab json.ts
bench_pair kv kv.vaab kv.ts
bench_pair sql sql.vaab sql.ts
bench_pair http http.vaab http.ts
bench_pair handler handler.vaab handler.ts
