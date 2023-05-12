const db = require('../configs/db');

module.exports = {
  getUserById: async (id) => db.select().first().from('users').where('user_id', id),
  getUserByEmail: async (email) => db.select().first().from('users').where('email', email),
  getUserByActivationLink: async (link) => db.select().first().from('users').where('activation_link', link),
  createUser: async (body) => db('users').insert(body),
  updateUser: async (id, body) => db.select().from('users').where('user_id', id).update(body)
};
