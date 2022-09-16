const mysql = require('mysql2');

let pool = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    database : 'db_droflix',
    user     : 'root',
    password : 'ph27092002'
});

module.exports = pool;