module.exports = {
  database: {
    client: 'pg',
    connection: process.env."postgresql://mitsustays_db_user:B66uLw6aDJPN3upLs3swmUWTJ7vVAX9l@dpg-d36mqbvdiees73bvgqr0-a.oregon-postgres.render.com/mitsustays_db",
    pool: { min: 0, max: 10 }
  }
};
