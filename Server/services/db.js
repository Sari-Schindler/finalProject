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
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        throw error; 
    }
}



module.exports = { createConnection };
