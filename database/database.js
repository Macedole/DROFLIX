const mysql = require("mysql2");

let pool = mysql.createPool({
  connectionLimit: 10,
  host: "leandromacedo.mysql.dbaas.com.br",
  port: "3306",
  user: "leandromacedo",
  password: "gmJk3UX5W#",
  database: "leandromacedo",
});

module.exports = pool;
