const mysql = require('mysql2/promise');

// MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hackernews',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
