const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data.sqlite');

const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
const seed = fs.readFileSync(path.join(__dirname, '..', 'seed.sql'), 'utf8');

const db = new sqlite3.Database(DB_PATH);
db.serialize(() => {
  db.exec(schema, (err) => {
    if (err) return console.error('Schema error:', err);
    console.log('Schema applied.');
    db.exec(seed, (err2) => {
      if (err2) return console.error('Seed error:', err2);
      console.log('Seed data inserted.');
      db.close();
    });
  });
});
