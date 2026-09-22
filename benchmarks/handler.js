import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('/var/folders/_k/vl10h9fn0ygcfzsv9cffksnr0000gn/T/tmpcvoddew0/handler.sqlite');
db.exec('CREATE TABLE IF NOT EXISTS sessions (user TEXT PRIMARY KEY, role TEXT NOT NULL)');
const get = db.prepare('SELECT role FROM sessions WHERE user = ?');
const set = db.prepare('INSERT OR REPLACE INTO sessions (user, role) VALUES (?, ?)');
function handle(user) {
  const row = get.get(user);
  const role = row ? row.role : 'member';
  if (!row) set.run(user, role);
  return JSON.stringify({ user, role });
}
for (let i = 0; i < 200; i++) handle(String(i % 20));