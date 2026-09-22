import { DatabaseSync } from 'node:sqlite'

interface UserRow {
  email: string
}

const db = new DatabaseSync('benchmarks/.data/app.db')
db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT NOT NULL)')

const insert = db.prepare('INSERT OR REPLACE INTO users (id, email) VALUES (?, ?)')
const select = db.prepare('SELECT email FROM users WHERE id = ?')

for (let i = 0; i < 100; i++) {
  insert.run(String(i), 'user@example.com')
}

for (let i = 0; i < 100; i++) {
  select.get(String(i)) as UserRow | undefined
}
