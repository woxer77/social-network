const db = require('../configs/db');

module.exports = {
  getAllPosts: async (page) => db.select().from('posts').orderBy([{ column: 'creation_date', order: 'desc' }, { column: 'creation_time', order: 'desc' }]).limit(page * 10)
    .offset((page - 1) * 10),
  getPostById: async (id) => db.select().first().from('posts').where('post_id', id),
  createPost: async (body) => db('posts').insert(body).returning('post_id'),
  deletePostById: async (id) => db.select().from('posts').where('post_id', id).del()
};
