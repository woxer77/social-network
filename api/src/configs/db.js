const config = require('./config');
const { dbHost } = require('./config');

console.log(config);
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
