const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use in-memory database for Render to avoid file system issues
const db = new sqlite3.Database(process.env.NODE_ENV === 'production' ? ':memory:' : path.join(__dirname, 'database.sqlite'));

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

module.exports = db;
