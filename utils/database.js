const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_js_project',
    password: 'codelogicx101',
})

module.exports = pool.promise();