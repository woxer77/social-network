const db = require('../configs/db');

module.exports = {
  addMessage: async (data) => db('messages').insert(data),
  getMessages: async (senderId, receiverId) => db.select().from('messages').whereRaw('users @> ?', [[senderId, receiverId]])
};
