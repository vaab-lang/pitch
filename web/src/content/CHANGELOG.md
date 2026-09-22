# Changelog

What shipped in each Vaab release. Newest first.

## 0.1.3 — 22 Sep 2026

### Language readability

Vaab reads closer to speech without giving up strict types or concurrency safety.

| | |
|---|---|
| Bare functions | `greet(name: Text) returns Text` (legacy `to` still parses) |
| `factory` | Class methods: `factory zero()` instead of `to self.zero()` |
| Implicit success | In `T or fails E`, `return x` means success; `fail e` means failure |
| Type sugar | `[Text]` / `{Text: Int}` alongside `list of` / `map of` |
| Prelude errors | Built-in `FileError`, `DbError`, `StoreError`, `HttpError`, … |
| `File.read` | Preferred over `read_file` |
| `log.info` | Works with no setup (process-default logger) |
| Auto JSON | Plain types encode without repeating `can Json` |
| Query English | `.where("owner").is("ada")` / `.equals(...)` alongside `.where_eq` |

Cast-first docs and examples: prefer `cast` for mutable roles; `type` for frozen data.

### Site

- Public repo renamed **pitch → site** (`vaab-lang/site`)
- `main.vaab` updated to the new surface; Docker pin → `v0.1.3`

## 0.1.2 — 22 Sep 2026

### Logger

A first-class `Logger` in the standard library — destinations, levels, and
formats the way other languages expect.

```vaab
log.info("server starting")

let custom = Logger.stderr()
custom.set_format("json")
custom.write("info", "request", {"method": "GET", "path": "/hello"})

let file = try Logger.file("app.log")
let both = Logger.multi([Logger.stdout(), file])
```

| | |
|---|---|
| Destinations | `stdout`, `stderr`, `file`, `memory`, `multi` |
| Levels | `debug` · `info` · `warn` · `error` |
| Formats | `text` · `json` · `pretty` |

The HTTP server (`vaab serve`) logs every request — method, path, status, and
duration — to stderr. Override with `VAAB_LOG_LEVEL` and `VAAB_LOG_FORMAT`.

### Docs and examples

- Spec and decisions cover logging
- `examples/19_logging.vaab` and the web-server example use `Logger`

## 0.1.1 — 22 Sep 2026

### Store

- Fixed a deadlock in `Store.remove` that hung delete and clear on open stores
- Overlay flush and remove no longer contend on the same lock

### Releases

- GitHub Actions publishes versioned binaries (`v0.1.1`) alongside `latest`

## 0.1.0 — Sep 2026

### Language

- Lexer, parser, type checker, bytecode VM
- Strict types with plain-English syntax (`yes`/`no`, `match`)
- Safe concurrency: channels, tasks, `select`, `together`, `shared`
- `pure` enforcement; data races are compile errors
- Casts and `entertains` (mutable objects + inheritance)
- Tier-1 Cranelift JIT for hot pure-integer bodies
- Multi-threaded work-stealing scheduler

### Standard library

- `print`, text/list/map/number methods
- `File.read` / `read_file`, `now`, `to_json`
- `env`, `Db`, `Store`, `http.get` / `.post` / `.send`
- Fluent AREL-style `Query` over Db and Store (`db.from` / `store.from`)
- `request.who` bearer auth

### Tooling

- `vaab run`, `vaab check`, `vaab parse`, `vaab repl`, `vaab new`, `vaab serve`
- Riffs package system (`riff install`)
- Static file serving (`reply file`) and browser playground (`POST /api/run`)
- Install script and GitHub Release binaries (linux x86_64, macOS aarch64)
