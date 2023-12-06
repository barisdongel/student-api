const Pool = require('pg').Pool;
const pool = new Pool({
    user: "root",
    host: "localhost",
    database: "student_db",
    password: "toor",
    port: 5432
});

module.exports = pool;