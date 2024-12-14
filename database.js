const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const csvParser = require("csv-parser");

const db = new sqlite3.Database(path.join(__dirname, "db", "database.db"));

// Wrapper for database methods
const dbMethods = {
    all: (query, params = []) =>
        new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        }),
    run: (query, params = []) =>
        new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) reject(err);
                else resolve(this);
            });
        }),
};

// Create tables
const createTables = () => {
    db.serialize(() => {
        db.run(
            `CREATE TABLE IF NOT EXISTS budget (
        id INTEGER PRIMARY KEY,
        amount INTEGER,
        time_period TEXT,
        sector TEXT
      )`
        );
        db.run(
            `CREATE TABLE IF NOT EXISTS investments (
        id INTEGER PRIMARY KEY,
        date TEXT,
        amount INTEGER,
        sector TEXT
      )`
        );
    });
};

// Populate tables from CSV
const populateTables = async () => {
    try {
        // Insert data into budget table
        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, "data", "budget.csv"))
                .pipe(csvParser())
                .on("data", (row) => {
                    db.run(
                        `INSERT INTO budget (id, amount, time_period, sector) VALUES (?, ?, ?, ?)`,
                        [row.ID, row.Amount, row["Time Period"], row.Sector || null]
                    );
                })
                .on("end", () => {
                    console.log("Budget table populated.");
                    resolve();
                })
                .on("error", (err) => reject(err));
        });

        // Insert data into investments table
        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, "data", "investments.csv"))
                .pipe(csvParser())
                .on("data", (row) => {
                    db.run(
                        `INSERT INTO investments (id, date, amount, sector) VALUES (?, ?, ?, ?)`,
                        [row.ID, row.Date, row.Amount, row.Sector || null]
                    );
                })
                .on("end", () => {
                    console.log("Investments table populated.");
                    resolve();
                })
                .on("error", (err) => reject(err));
        });
    } catch (err) {
        console.error("Error populating tables:", err);
    }
};

// Initialize database
const initializeDatabase = async () => {
    try {
        createTables();
        await populateTables();
    } catch (err) {
        console.error("Error initializing database:", err);
    }
};

module.exports = { db: dbMethods, initializeDatabase };
