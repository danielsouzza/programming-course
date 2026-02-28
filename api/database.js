const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function getDb() {
    const db = await open({
        filename: './api/database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT,
            done BOOLEAN DEFAULT 0,
            userId INTEGER,
            FOREIGN KEY(userId) REFERENCES users(id)
        );
    `);

    return db;
}

module.exports = {
    getDb
};
