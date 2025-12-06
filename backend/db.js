const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();
const dbPath = process.env.DB_PATH || path.join(__dirname, 'data.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not open DB', err);
  } else {
    console.log('Connected to SQLite DB at', dbPath);
  }
});

module.exports = db;
