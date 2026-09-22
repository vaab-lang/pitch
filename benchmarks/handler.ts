import { DatabaseSync } from 'node:sqlite'

interface SessionRow {
  role: string
}

interface SessionJson {
  user: string
  role: string
}

const db = new DatabaseSync('benchmarks/.data/handler.sqlite')
db.exec('CREATE TABLE IF NOT EXISTS sessions (user TEXT PRIMARY KEY, role TEXT NOT NULL)')

const get = db.prepare('SELECT role FROM sessions WHERE user = ?')
const set = db.prepare('INSERT OR REPLACE INTO sessions (user, role) VALUES (?, ?)')

function handle(user: string): string {
  const row = get.get(user) as SessionRow | undefined
  const role = row?.role ?? 'member'
  if (!row) {
    set.run(user, role)
  }
  const session: SessionJson = { user, role }
  return JSON.stringify(session)
}

for (let i = 0; i < 200; i++) {
  handle(String(i % 20))
}
