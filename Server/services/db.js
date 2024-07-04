const mysql = require('mysql2/promise');
require('dotenv/config');

async function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });
}

module.exports = { createConnection };
