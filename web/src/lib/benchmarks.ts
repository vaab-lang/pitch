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
    nodeFilename: 'users.ts',
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
    nodeCode: `function usersJson(): string[] {
  const out: string[] = [];
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
      { language: 'Vaab', ms: 8.7, color: '#10b981' },
      { language: 'Node.js', ms: 109.4, color: '#84cc16' },
    ],
  },
  {
    id: 'kv',
    tab: 'Cache store',
    title: 'Cache store sessions',
    description:
      'Insert and look up session keys through `store.from` — the same fluent query chain as the database.',
    workload: '200 inserts + 200 keyed lookups',
    unit: 'ms',
    vaabFilename: 'sessions.vaab',
    nodeFilename: 'sessions.ts',
    vaabCode: `to remember(store: Store, key: Text, value: Text) {
    store.from("session:").insert({
        "key": key,
        "value": value,
    })
}

to lookup(store: Store, key: Text) returns Text {
    match store.from("session:").where_eq("key", key).first() {
        when success found_row then {
            match found_row {
                when found row then {
                    return row.get("value") otherwise "absent"
                }
                when nothing then { return "absent" }
            }
        }
        when failure _ then { return "absent" }
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

export function remember(key: string, value: string): void {
  set.run(key, value);
}

export function lookup(key: string): string {
  return get.get(key)?.v ?? "absent";
}`,
    rows: [
      { language: 'Vaab', ms: 106.3, color: '#10b981' },
      { language: 'Node.js', ms: 207.3, color: '#84cc16' },
    ],
  },
  {
    id: 'sql',
    tab: 'Database',
    title: 'Database lookups',
    description:
      'Insert and fetch rows with `db.from` — filters compile to parameterized SQL through sea-query.',
    workload: '100 inserts + 100 indexed lookups',
    unit: 'ms',
    vaabFilename: 'users.vaab',
    nodeFilename: 'users.ts',
    vaabCode: `to find_user(db: Db, id: Text)
        returns map of Text to Text or fails DbError {
    match db.from("users").where_eq("id", id).first() {
        when success found_row then {
            match found_row {
                when found row then { return success row }
                when nothing then {
                    return failure DbError.Failed("missing user")
                }
            }
        }
        when failure error then match error {
            when Failed(message) then {
                return failure DbError.Failed(message)
            }
        }
    }
}

try db.from("users").insert({
    "id": id,
    "email": "user@example.com",
})`,
    nodeCode: `import { DatabaseSync } from "node:sqlite";

interface UserRow {
  email: string;
}

const db = new DatabaseSync("app.db");
const select = db.prepare(
  "SELECT email FROM users WHERE id = ?",
);

export function findUser(id: string): UserRow | undefined {
  return select.get(String(id)) as UserRow | undefined;
}`,
    rows: [
      { language: 'Vaab', ms: 63.9, color: '#10b981' },
      { language: 'Node.js', ms: 161.0, color: '#84cc16' },
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
    nodeFilename: 'notify.ts',
    vaabCode: `to ping_service(url: Text) returns Text or fails HttpError {
    match http.get(url) {
        when success body then { return success body }
        when failure error then match error {
            when Failed(message) then {
                return failure HttpError.Failed(message)
            }
        }
    }
}`,
    nodeCode: `export async function pingService(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.text();
}`,
    rows: [
      { language: 'Vaab', ms: 24.2, color: '#10b981' },
      { language: 'Node.js', ms: 203.2, color: '#84cc16' },
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
    nodeFilename: 'handler.ts',
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
    nodeCode: `import { DatabaseSync } from "node:sqlite";

interface SessionJson {
  user: string;
  role: string;
}

export function sessionJson(
  db: DatabaseSync,
  user: string,
): string {
  const row = db.prepare(
    "SELECT role FROM sessions WHERE user = ?",
  ).get(user) as { role: string } | undefined;

  const role = row?.role ?? "member";
  if (!row) {
    db.prepare(
      "INSERT OR REPLACE INTO sessions (user, role) VALUES (?, ?)",
    ).run(user, role);
  }

  const session: SessionJson = { user, role };
  return JSON.stringify(session);
}`,
    rows: [
      { language: 'Vaab', ms: 66.7, color: '#10b981' },
      { language: 'Node.js', ms: 116.3, color: '#84cc16' },
    ],
  },
]

export const BENCHMARK_FOOTNOTE =
  'Measured locally · 5-run average · vaab 0.1 release vs Node 22 (TypeScript) · Sep 2026. Node cache/handler benchmarks use node:sqlite; Vaab uses built-in Store and Db with fluent query chains. Store keeps hot keys in memory and batches durable writes (32 keys per commit).'
