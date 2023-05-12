const db = require('../configs/db');

module.exports = {
  getTokenById: async (id) => db.select().first().from('sessions').where('user_id', id),
  updateTokenById: async (id, body) => db.select().first().from('sessions').where('user_id', id)
    .update(body),
  createToken: async (body) => db.insert(body).into('sessions'),
  removeToken: async (token) => db.select().from('sessions').where('refresh_token', token).del(),
  getTokenByToken: async (token) => db.select().first().from('sessions').where('refresh_token', token)
};
