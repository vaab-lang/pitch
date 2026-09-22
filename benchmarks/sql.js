import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('/var/folders/_k/vl10h9fn0ygcfzsv9cffksnr0000gn/T/tmpcvoddew0/app.db');
db.exec('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT NOT NULL)');
const insert = db.prepare('INSERT OR REPLACE INTO users (id, email) VALUES (?, ?)');
const select = db.prepare('SELECT email FROM users WHERE id = ?');
for (let i = 0; i < 100; i++) insert.run(String(i), 'user@example.com');
for (let i = 0; i < 100; i++) select.get(String(i));