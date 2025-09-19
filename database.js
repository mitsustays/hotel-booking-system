const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env."postgresql://mitsustays_db_user:B66uLw6aDJPN3upLs3swmUWTJ7vVAX9l@dpg-d36mqbvdiees73bvgqr0-a.oregon-postgres.render.com/mitsustays_db",
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
