const db = require('../db');

module.exports = {
  getAllPosts: async () => db.select().from('posts').orderBy('post_id')
};
