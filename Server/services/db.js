const mysql = require('mysql2/promise');
require('dotenv/config');

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.PASSWORD,
            port: process.env.DB_PORT
        });
        console.log('Connected to MySQL database!');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        throw error;  // Rethrow the error to propagate it further
    }
}



module.exports = { createConnection };
