require('../environment');
const logger = require('../server/logger')('database')

const parseDatabaseUrl = require("parse-database-url");

const config = parseDatabaseUrl(process.env.DATABASE_URL);

const pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    afterCreate: function (client, done) {
      client.query('SET timezone="UTC";', function (error) {
        done(error, client);
      });
    }
  }
})

pg.on('start', sqlQuery => {
  logger.debug('QUERY:', JSON.stringify(sqlQuery.toString()))
})
// pg.on('query', (...args) => {
//   logger.debug('knex:query', args)
// })

module.exports = { config, pg }
