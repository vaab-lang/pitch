# pitch

The Vaab **pitch** — landing page and browser playground for [Vaab](https://github.com/vaab-lang/vaab).

One command serves everything: the React frontend, `/health`, and the interactive playground (`POST /api/run`).

## Quick start

Requires a local [Vaab](https://github.com/vaab-lang/vaab) build with static-file support (`reply file`, catch-all routes).

```sh
cd web && npm install && npm run build && cd ..
vaab serve main.vaab
# → http://127.0.0.1:8787
```

Or via Cargo from the vaab checkout:

```sh
cargo run --bin vaab -- serve /path/to/vaab-site/main.vaab
```

## What's inside

| Path | Purpose |
|------|---------|
| `main.vaab` | Unified server — static files, health, KV todos, request logging |
| `web/` | React + Vite landing page with CodeMirror playground |
| `/changelog` | Release notes (Logger landed in 0.1.2) |

Static files are served with Vaab’s `reply file` (no reverse proxy).

## Architecture

```
Browser
   │
   ├─ GET /*                  → reply file web/dist/...
   ├─ GET /health             → Vaab JSON route
   ├─ GET|POST /api/todos/…   → Store-backed todos (per visitor cookie)
   └─ POST /api/run           → vaab-server playground (embedded VM)
```

Request logging uses the stdlib `Logger` (stderr, text format by default). The
server process also logs method/path/status/ms. Set `VAAB_LOG_LEVEL` /
`VAAB_LOG_FORMAT` to change both.
## Todos demo

`/tasks` is a classic todo list served by the same Vaab process. The browser
sets a `vaab_visitor` cookie (UUID); API calls use that id in the path so each
visitor’s rows live under `todo:{visitor}:` in `pitch-todos.vaab.kv`.

## Benchmarks

Reproduce the performance numbers on the landing page:

```sh
./benchmarks/run.sh
```

Uses `db.from` / `store.from` query chains in the Vaab workloads and TypeScript on Node 22 (`--experimental-strip-types`). Set `VAAB=/path/to/vaab` and `RUNS=5` to override defaults.

## Development

```sh
cd web && npm run build && cd ..
vaab serve main.vaab
```

## Docker

Vaab is the web server end-to-end: the container runs `vaab serve main.vaab` (static files via `reply file`, `/health`, and `POST /api/run`). Nothing else fronts HTTP.

```sh
docker build --platform linux/amd64 -t pitch .
docker run --rm -p 8787:8787 -e PORT=8787 pitch
# → http://127.0.0.1:8787
```

The image downloads the Vaab linux binary, builds `web/`, and rewrites `serve on port` from `$PORT` at start (so Render / Cloud Run work).

## Free hosting (Render)

[`render.yaml`](./render.yaml) deploys this Dockerfile on Render’s free web plan (spins down after ~15 minutes idle; cold start ~1 min). Deploy from the private host repo.

Private deploy repos:
- https://github.com/ryanza/pitch-host
- https://github.com/vaab-lang/pitch-host

Live (free tier): https://pitch-n9eh.onrender.com

## License

MIT — same as Vaab.
