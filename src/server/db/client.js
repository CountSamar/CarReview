const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

// If you have a DATABASE_URL (like when deploying to some platforms), use it.
// Otherwise, build the connection string from individual components.
const connectionString = process.env.DATABASE_URL || 'postgres://carreview_user:6n8KVVfZQlocyNMNRppBGRnCJzUf211i@dpg-ck9n8m6gtj9c73baorng-a.ohio-postgres.render.com/carreview';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false  // for self-signed certificate; be careful with this in production
  }
});

pool.connect()
  .then(() => {
    console.log("Successfully connected to the database!");
  })
  .catch(err => {
    console.error("Error connecting to the database:", err.stack);
  });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
