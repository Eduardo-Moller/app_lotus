const mysql = require('mysql2/promise');

async function connection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    connection.connect((err) => {
        if (err) {
            return console.log('Error connecting to DB: ', err);
        }
    });
    return connection;
}

async function query(sql, params) {
    const conn = await connection();
    const [rows] = await conn.query(sql, params);
    return rows;
}

module.exports = { query };
