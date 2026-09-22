export type BenchmarkRow = {
  language: string
  ms: number
  color: string
}

export type BackendBenchmark = {
  id: string
  tab: string
  title: string
  description: string
  workload: string
  unit: string
  vaabCode: string
  nodeCode: string
  vaabFilename: string
  nodeFilename: string
  rows: BenchmarkRow[]
}

/** 5-run averages on Apple Silicon · vaab 0.1 release · Node 22 · Sep 2026 */
export const BACKEND_BENCHMARKS: BackendBenchmark[] = [
  {
    id: 'json',
    tab: 'JSON',
    title: 'JSON responses',
    description:
      'Build typed records and serialize them — the work behind every `reply with` on an API route.',
    workload: '1,000 × serialize User → JSON',
    unit: 'ms',
    vaabFilename: 'users.vaab',
    nodeFilename: 'users.js',
    vaabCode: `type User can Json {
    id: Int
    name: Text
    active: Bool
}

to users_json() returns list of Text {
    let changing i = 0
    let changing out: list of Text = []
    while i < 1000 {
        let user = User.new(
            id: i,
            name: "user",
            active: yes,
        )
        out = out + [to_json(user)]
        i = i + 1
    }
    return out
}`,
    nodeCode: `function usersJson() {
  const out = [];
  for (let i = 0; i < 1000; i++) {
    out.push(JSON.stringify({
      id: i,
      name: "user",
      active: true,
    }));
  }
  return out;
}`,
    rows: [
      { language: 'Vaab', ms: 6.7, color: '#10b981' },
      { language: 'Node.js', ms: 58.1, color: '#84cc16' },
    ],
  },
  {
    id: 'kv',
    tab: 'KV store',
    title: 'Key-value sessions',
    description:
      'Read and write session keys with Vaab\'s built-in `Store` — no Redis install, no extra service.',
    workload: '200 durable writes + 200 reads',
    unit: 'ms',
    vaabFilename: 'sessions.vaab',
    nodeFilename: 'sessions.js',
    vaabCode: `choice StoreError {
    Failed(message: Text)
}

to remember(store: Store, key: Text, value: Text) {
    match store.set(key, value) {
        when success _ then { return }
        when failure error then match error {
            when Failed(message) then {
                print("set failed: {message}")
            }
        }
    }
}

to lookup(store: Store, key: Text) returns Text {
    match store.get(key) {
        when found value then { return value }
        when nothing     then { return "absent" }
    }
}`,
    nodeCode: `import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("sessions.sqlite");
db.exec(\`
  CREATE TABLE IF NOT EXISTS kv (
    k TEXT PRIMARY KEY,
    v TEXT NOT NULL
  )
\`);

const set = db.prepare(
  "INSERT OR REPLACE INTO kv (k, v) VALUES (?, ?)",
);
const get = db.prepare(
  "SELECT v FROM kv WHERE k = ?",
);

export function remember(key, value) {
  set.run(key, value);
}

export function lookup(key) {
  return get.get(key)?.v ?? "absent";
}`,
    rows: [
      { language: 'Vaab', ms: 47.5, color: '#10b981' },
      { language: 'Node.js', ms: 134.9, color: '#84cc16' },
    ],
  },
  {
    id: 'sql',
    tab: 'SQLite',
    title: 'SQLite lookups',
    description:
      "Insert and query rows through Vaab's first-class `Db` builtin — the same SQLite you'd use in a small backend.",
    workload: '100 upserts + 100 indexed SELECTs',
    unit: 'ms',
    vaabFilename: 'users.vaab',
    nodeFilename: 'users.js',
    vaabCode: `choice DbError {
    Failed(message: Text)
}

to find_user(db: Db, id: Text)
        returns map of Text to Text or fails DbError {
    match db.query(
        "SELECT email FROM users WHERE id = ?",
        [id],
    ) {
        when success rows then { return success rows[0] }
        when failure error then match error {
            when Failed(message) then {
                return failure DbError.Failed(message)
            }
        }
    }
}`,
    nodeCode: `import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("app.db");
const select = db.prepare(
  "SELECT email FROM users WHERE id = ?",
);

export function findUser(id) {
  return select.get(String(id));
}`,
    rows: [
      { language: 'Vaab', ms: 27.2, color: '#10b981' },
      { language: 'Node.js', ms: 63.1, color: '#84cc16' },
    ],
  },
  {
    id: 'http',
    tab: 'HTTP',
    title: 'Outbound HTTP',
    description:
      'Call a downstream health check in a loop — webhooks, auth providers, and microservices all look like this.',
    workload: '50 sequential GET requests',
    unit: 'ms',
    vaabFilename: 'notify.vaab',
    nodeFilename: 'notify.js',
    vaabCode: `choice HttpError {
    Failed(message: Text)
}

to ping_service(url: Text) returns Text or fails HttpError {
    match http.get(url) {
        when success body then { return success body }
        when failure error then match error {
            when Failed(message) then {
                return failure HttpError.Failed(message)
            }
        }
    }
}`,
    nodeCode: `export async function pingService(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.text();
}`,
    rows: [
      { language: 'Vaab', ms: 12.8, color: '#10b981' },
      { language: 'Node.js', ms: 91.4, color: '#84cc16' },
    ],
  },
  {
    id: 'handler',
    tab: 'Handler',
    title: 'Route handler pipeline',
    description:
      'Lookup a session, create it if missing, return JSON — a miniature version of a real authenticated route.',
    workload: '200 handler calls · 20 unique users',
    unit: 'ms',
    vaabFilename: 'handler.vaab',
    nodeFilename: 'handler.js',
    vaabCode: `type Session can Json {
    user: Text
    role: Text
}

to session_json(store: Store, user: Text) returns Text {
    match store.get("session:{user}") {
        when found role then {
            return to_json(Session.new(user: user, role: role))
        }
        when nothing then {
            store.set("session:{user}", "member")
            return to_json(Session.new(user: user, role: "member"))
        }
    }
}`,
    nodeCode: `export function sessionJson(db, user) {
  const row = db.prepare(
    "SELECT role FROM sessions WHERE user = ?",
  ).get(user);

  const role = row?.role ?? "member";
  if (!row) {
    db.prepare(
      "INSERT OR REPLACE INTO sessions (user, role) VALUES (?, ?)",
    ).run(user, role);
  }

  return JSON.stringify({ user, role });
}`,
    rows: [
      { language: 'Vaab', ms: 40.1, color: '#10b981' },
      { language: 'Node.js', ms: 40.1, color: '#84cc16' },
    ],
  },
]

export const BENCHMARK_FOOTNOTE =
  'Measured locally · 5-run average · vaab 0.1 release vs Node 22 · Sep 2026. Node KV/handler use node:sqlite; Vaab uses built-in Store and Db. Store keeps hot keys in memory and batches durable writes (32 keys per commit).'
