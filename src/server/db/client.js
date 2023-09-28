const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-ck9n8m6gtj9c73baorng-a', 
  port: 5432, 
  database: 'carreview', 
  user: 'carreview_user',
  password: '6n8KVVfZQlocyNMNRppBGRnCJzUf211i',  
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

pool.connect()
  .then(() => {
    console.log("Successfully connected to the database!");
    pool.end();
  })
  .catch(err => {
    console.error("Error connecting to the database:", err.stack);
    pool.end();
  });

module.exports = pool;
