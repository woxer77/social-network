const db = require('../configs/db');

module.exports = {
  getAllPostsForUser: async (userId) => db.select().from('posts').where('availability_list', '=', [])
    .orWhere('availability_list', '@>', [userId])
    .orderBy([{ column: 'creation_date', order: 'desc' }, { column: 'creation_time', order: 'desc' }]),
  getAllPostsOfUser: async (userId) => db.select().from('posts').where('user_id', userId).orderBy([{ column: 'creation_date', order: 'desc' }, { column: 'creation_time', order: 'desc' }]),
  getAllLikes: async (postId) => db.select('user_id').from('liked_user_post').where('post_id', postId),
  getPostById: async (id) => db.select().first().from('posts').where('post_id', id),
  createPost: async (body) => db('posts').insert(body).returning('post_id'),
  // eslint-disable-next-line consistent-return
  likePost: async (userId, postId) => {
    const existingRecord = await db('liked_user_post')
      .where({ user_id: userId, post_id: postId });

    if (existingRecord.length > 0) {
      // Если запись существует, удаляем ее
      return db('liked_user_post')
        .where({ user_id: userId, post_id: postId })
        .del();
    }
    // Если записи нет, создаем ее
    return db('liked_user_post')
      .insert({ user_id: userId, post_id: postId });
  },
  deletePostById: async (id) => db.select().from('posts').where('post_id', id).del()
};
