const postsDbService = require('./post-db-service');

module.exports = {
  async getAllPosts(page) {
    const posts = await postsDbService.getAllPosts(page);
    return posts;
  },

  async createPost(userId, text, images, availability, creationDate, creationTime) {
    const postId = await postsDbService.createPost({
      user_id: userId,
      text,
      images,
      availability,
      creation_date: creationDate,
      creation_time: creationTime
    });
    const post = await postsDbService.getPostById(postId[0].post_id);

    const postPayload = {
      userId: post.user_id,
      text: post.text,
      images: post.images,
      availability: post.availability,
      creationDate: post.creation_date,
      creationTime: post.creation_time
    };
    return postPayload;
  },

  async deletePost(postId) {
    await postsDbService.deletePostById(postId);
  }
};
