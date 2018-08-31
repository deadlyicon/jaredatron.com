require('../environment');

const parseDatabaseUrl = require("parse-database-url");

const config = parseDatabaseUrl(process.env.DATABASE_URL);

const pg = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

module.exports = { config, pg }
