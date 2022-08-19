const db = require('../db');

module.exports = {
  getUserById: async (id) => db.select().first().from('users').where('user_id', id)
};
