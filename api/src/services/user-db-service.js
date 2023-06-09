const db = require('../configs/db');

module.exports = {
  getUserById: async (id) => db.select().first().from('users').where('user_id', id),
  getUsersByIds: async (usersIds) => db.select().from('users').whereIn('user_id', usersIds),
  getUserByEmail: async (email) => db.select().first().from('users').where('email', email),
  getUserByActivationLink: async (link) => db.select().first().from('users').where('activation_link', link),
  createUser: async (body) => db('users').insert(body),
  updateUser: async (id, body) => db.select().from('users').where('user_id', id).update(body),
  updateUserCoverPhoto: async (userId, filename) => db.select().from('users').where('user_id', userId).update({ cover_photo: filename })
    .returning('cover_photo'),
  updateUserAvatar: async (userId, filename) => db.select().from('users').where('user_id', userId).update({ avatar: filename })
    .returning('avatar'),
  updateFollowing: async (userId, userFollowing) => db.select().from('users').where('user_id', userId).update({ following: userFollowing })
    .returning('following'),
  getUserFollowers: async (userId) => db.first().select('followers').from('users').where('user_id', userId),
  updateFollowers: async (userId, userFollowers) => db.select().from('users').where('user_id', userId).update({ followers: userFollowers })
    .returning('followers')
};
