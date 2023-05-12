const config = require('./config');
const { dbHost } = require('./config');

console.log(config, dbHost, config.dbPort, config.dbUser, config.dbPassword, config.dbDatabase);
module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase
  }
});
