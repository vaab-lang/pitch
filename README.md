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
| `main.vaab` | Unified server — static files + health check |
| `riffs/deck/` | Static file riff: `for_path`, `mime_for` |
| `web/` | React + Vite landing page with CodeMirror playground |

## Architecture

```
Browser
   │
   ├─ GET /*          → reply file (served from the deck)
   ├─ GET /health     → Vaab JSON route
   └─ POST /api/run   → vaab-server playground (embedded VM)
```

## deck riff

**deck** is a Vaab riff for serving static files — paths and mime types, plain English:

- `deck.for_path(root, requested)` — resolve a safe path under a static root
- `deck.mime_for(path)` — guess a content type from a file extension

```
need deck from ./riffs/deck
```

## Development

```sh
cd web && npm run build && cd ..
vaab serve main.vaab
```

## License

MIT — same as Vaab.
