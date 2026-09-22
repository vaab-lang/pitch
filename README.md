# pitch

The Vaab **pitch** — landing page and browser playground for [Vaab](https://github.com/vaab-lang/vaab).

One command serves everything: the React frontend, `/health`, and the interactive playground (`POST /api/run`).

## Quick start

Requires a local [Vaab](https://github.com/vaab-lang/vaab) build with static-file support (`reply file`, catch-all routes).

```sh
cd web && npm install && npm run build && cd ..
riff install tape
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
| `main.vaab` | Unified server — static files + health check |
| `web/` | React + Vite landing page with CodeMirror playground |

Static files are served through the **[tape](https://github.com/vaab-lang/tape)** riff (`riff install tape`).

## Architecture

```
Browser
   │
   ├─ GET /*          → tape.resolve → reply file
   ├─ GET /health     → Vaab JSON route
   └─ POST /api/run   → vaab-server playground (embedded VM)
```

## tape riff

**tape** is the official static-file riff (formerly the local express/deck helper). It lives in its own repo: [vaab-lang/tape](https://github.com/vaab-lang/tape).

- `tape.for_path(root, requested)` — resolve a safe path under a static root
- `tape.resolve(root, requested)` — same, with `StaticError` for route matching
- `tape.mime_for(path)` — guess a content type from a file extension

```vaab
need tape
```

## Benchmarks

Reproduce the performance numbers on the landing page:

```sh
./benchmarks/run.sh
```

Uses `db.from` / `store.from` query chains in the Vaab workloads and TypeScript on Node 22 (`--experimental-strip-types`). Set `VAAB=/path/to/vaab` and `RUNS=5` to override defaults.

## Development

```sh
cd web && npm run build && cd ..
riff install tape
vaab serve main.vaab
```

For local riff work, use a path dep: `need tape from "../tape"`, or copy into `~/.vaab/riffs` after `riff install tape`.

## Docker

Vaab is the web server end-to-end: the container runs `vaab serve main.vaab` (static files via [tape](https://github.com/vaab-lang/tape), `/health`, and `POST /api/run`). Nothing else fronts HTTP.

```sh
docker build --platform linux/amd64 -t pitch .
docker run --rm -p 8787:8787 -e PORT=8787 pitch
# → http://127.0.0.1:8787
```

The image downloads the Vaab linux binary and the tape riff, builds `web/`, and rewrites `serve on port` from `$PORT` at start (so Render / Cloud Run work).

## Free hosting (Render)

[`render.yaml`](./render.yaml) deploys this Dockerfile on Render’s free web plan (spins down after ~15 minutes idle; cold start ~1 min). Deploy from the private host repo (see below), not the public pitch sources.

1. Connect the private GitHub repo in [Render](https://dashboard.render.com).
2. **New → Blueprint** (or **Web Service** → Docker → plan **Free**).
3. After deploy, open the `*.onrender.com` URL; `/health` should return JSON.

Fly.io no longer has a lasting free tier for new accounts; Render’s free Docker web service is the practical zero-cost option.

## License

MIT — same as Vaab.
