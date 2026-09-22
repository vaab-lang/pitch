import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync('benchmarks/.data/kv.sqlite')
db.exec(`
  CREATE TABLE IF NOT EXISTS kv (
    k TEXT PRIMARY KEY,
    v TEXT NOT NULL
  )
`)

const set = db.prepare('INSERT OR REPLACE INTO kv (k, v) VALUES (?, ?)')
const get = db.prepare('SELECT v FROM kv WHERE k = ?')

for (let i = 0; i < 200; i++) {
  set.run(`session:${i}`, 'signed-in')
}

for (let i = 0; i < 200; i++) {
  get.get(`session:${i}`)
}
