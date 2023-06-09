const db = require('../configs/db');

module.exports = {
  getAllCommentsOfPosts: async (postsId) => db.select().from('comments').whereIn('post_id', postsId).orderBy([{ column: 'creation_date', order: 'desc' }, { column: 'creation_time', order: 'desc' }]),
  createComment: async (body) => db('comments').insert(body).returning('comment_id'),
  deleteCommentById: async (id) => db.select().from('comments').where('comment_id', id).del()
};
