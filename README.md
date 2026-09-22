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

## Development

```sh
cd web && npm run build && cd ..
riff install tape
vaab serve main.vaab
```

For local riff work, use a path dep: `need tape from "../tape"`, or copy into `~/.vaab/riffs` after `riff install tape`.

## License

MIT — same as Vaab.
