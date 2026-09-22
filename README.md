# vaab-site

Landing page and browser playground for [Vaab](https://github.com/vaab-lang/vaab) — a strictly typed, plain-English programming language.

## What's inside

| Path | Purpose |
|------|---------|
| `web/` | React + Vite landing page with interactive "Try Vaab" editor |
| `runner/` | Rust HTTP service — embeds the Vaab VM for `POST /api/run` |
| `server/` | Example API written in Vaab (`vaab serve server/main.vaab`) |

The playground runs code through the **real** Vaab parser, type checker, and VM — the same pipeline as `vaab run`.

## Quick start

### 1. Start the runner (required for playground)

```sh
cd runner
cargo run
# listens on http://127.0.0.1:8787
```

For local development, the runner uses your sibling `../vaab` checkout via `.cargo/config.toml`. Without it, Cargo fetches crates from GitHub.

### 2. Start the frontend

```sh
cd web
npm install
npm run dev
# opens http://localhost:5173 — proxies /api to the runner
```

### 3. (Optional) Vaab-written API server

```sh
vaab serve server/main.vaab
# http://127.0.0.1:8788/health
# http://127.0.0.1:8788/api/examples
```

## Architecture

```
Browser (React + CodeMirror)
    │
    │  POST /api/run { source: "..." }
    ▼
Runner (Rust + Axum)
    │
    ├── vaab-syntax  → parse
    ├── vaab-types   → check
    └── vaab-vm      → run → { stdout, result }
```

The Vaab API in `server/` demonstrates HTTP routes written in Vaab itself — separate from the playground runner, which must embed the VM in Rust to execute arbitrary user code safely.

## Production build

```sh
cd web && npm run build
cd runner && cargo build --release
```

Serve `web/dist` statically and run the runner behind a reverse proxy. Configure the frontend to proxy `/api` to the runner.

## License

MIT — same as Vaab.
