import mysql from 'mysql2';

const pool =mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'articles_info'
}).promise();

const result = await pool.query("SELECT * FROM Articles");
const rows =result[0];
console.log(rows);