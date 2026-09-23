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

/** 5-run averages on Apple Silicon · vaab 0.1.3 · Node 24 · Sep 2026 */
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
    vaabCode: `type User {
    id: Int
    name: Text
    active: Bool
}

users_json() {
    let changing i = 0
    while i < 1000 {
        let user = User.new(id: i, name: "user", active: yes)
        let json = to_json(user)
        i = i + 1
    }
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
      { language: 'Vaab', ms: 5.5, color: '#10b981' },
      { language: 'Node.js', ms: 58.9, color: '#84cc16' },
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
    vaabCode: `remember(store: Store, key: Text, value: Text) returns Int or fails StoreError {
    let count = try store.from("session:").insert({
        "key": key,
        "value": value,
    })
    return success count
}

lookup(store: Store, key: Text) returns Text or fails StoreError {
    let row = try store.from("session:").where("key").is(key).first()
    match row {
        when found session then {
            let value = session.get("value") otherwise "absent"
            return success value
        }
        when nothing then { return success "absent" }
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
      { language: 'Vaab', ms: 75.3, color: '#10b981' },
      { language: 'Node.js', ms: 122.6, color: '#84cc16' },
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
    vaabCode: `create_user(db: Db, id: Text, email: Text) returns Int or fails DbError {
    let count = try db.from("users").insert({
        "id": id,
        "email": email,
    })
    return success count
}

find_user(db: Db, id: Text) returns map of Text to Text or fails DbError {
    let row = try db.from("users").where("id").is(id).first()
    match row {
        when found user then { return success user }
        when nothing then {
            return failure DbError.Failed("missing user")
        }
    }
}`,
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
      { language: 'Vaab', ms: 35.6, color: '#10b981' },
      { language: 'Node.js', ms: 89.3, color: '#84cc16' },
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
    vaabCode: `ping_service(url: Text) returns Text or fails HttpError {
    let body = try http.get(url)
    return success body
}`,
    nodeCode: `export async function pingService(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.text();
}`,
    rows: [
      { language: 'Vaab', ms: 11.7, color: '#10b981' },
      { language: 'Node.js', ms: 104.2, color: '#84cc16' },
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
    vaabCode: `type Session {
    user: Text
    role: Text
}

session_json(store: Store, user: Text) returns Text or fails StoreError {
    match store.get("session:{user}") {
        when found role then {
            return success to_json(Session.new(user: user, role: role))
        }
        when nothing then {
            try store.set("session:{user}", "member")
            return success to_json(Session.new(user: user, role: "member"))
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
      { language: 'Vaab', ms: 32.4, color: '#10b981' },
      { language: 'Node.js', ms: 67.6, color: '#84cc16' },
    ],
  },
]

export const BENCHMARK_FOOTNOTE =
  'Measured locally · 5-run average · vaab 0.1.3 vs Node 24 (TypeScript) · Sep 2026. Node cache/handler benchmarks use node:sqlite; Vaab uses built-in Store and Db with fluent query chains. Store keeps hot keys in memory and batches durable writes (32 keys per commit).'
