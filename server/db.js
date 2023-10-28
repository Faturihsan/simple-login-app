const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "faturihsan2002",
  host: "localhost",
  port: 5432,
  database: "db_tugas"
});

module.exports = pool;