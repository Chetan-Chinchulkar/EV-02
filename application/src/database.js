const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to the SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS names (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS secrets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            secret_key TEXT,
            secret_value TEXT
        )`);

        const sampleData = [
            'betelguese',
            'mohan',
            'rama',
            'sriram',
            's1r1us',
            'krishna'
        ];

        const insertName = db.prepare('INSERT INTO names (name) VALUES (?)');
        sampleData.forEach(name => {
            insertName.run(name);
        });
        insertName.finalize();

        db.run('INSERT INTO secrets (secret_key, secret_value) VALUES (?, ?)', 
            ['flag', process.env.FLAG]
        );
    });
}

// Export the database connection
module.exports = db; 
