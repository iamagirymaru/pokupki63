const path = require('path')
require('dotenv').config({path:path.join(__dirname,'../.env')})

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },
  migrations: {
    directory: __dirname + '/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: __dirname + '/seeds'
  }
}
