const db = require('../configs/db');

module.exports = {
  getUsersWhoLikedPost: async (id) => db.select('user_id').from('liked_user_post').where('post_id', id)
};
