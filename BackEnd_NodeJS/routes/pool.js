const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: 'project_collab',
  password: process.env.PASSWORD, 
  port: 5432,
})

module.exports = pool;
