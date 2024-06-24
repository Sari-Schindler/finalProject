import * as mysql from 'mysql2/promise';
import 'dotenv/config';

async function createConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: process.env.DB_NAME,
      password: process.env.PASSWORD
    });
}

export { createConnection };
