const postsDbService = require('./post-db-service');

module.exports = {
  async getAllPostsForUser(userId) {
    const posts = await postsDbService.getAllPostsForUser(userId);
    return posts;
  },

  async getAllPostsOfUser(userId) {
    const posts = await postsDbService.getAllPostsOfUser(userId);
    return posts;
  },

  async getAllLikes(postId) {
    const postLikes = await postsDbService.getAllLikes(postId);
    const usersId = postLikes.map((obj) => obj.user_id);
    return usersId;
  },

  async createPost(userId, text, images, availability, availabilityList, creationDate, creationTime) {
    const postId = await postsDbService.createPost({
      user_id: userId,
      text,
      images,
      availability,
      availability_list: availabilityList,
      creation_date: creationDate,
      creation_time: creationTime
    });
    const post = await postsDbService.getPostById(postId[0].post_id);

    const postPayload = {
      userId: post.user_id,
      text: post.text,
      images: post.images,
      availability: post.availability,
      availabilityList: post.availability_list,
      creationDate: post.creation_date,
      creationTime: post.creation_time
    };
    return postPayload;
  },

  async likePost(userId, postId) {
    const liked = await postsDbService.likePost(userId, postId);

    if (liked) {
      const postLikes = await postsDbService.getAllLikes(postId);
      const usersId = postLikes.map((obj) => obj.user_id);

      return usersId;
    } return [];
  },

  async deletePost(postId) {
    await postsDbService.deletePostById(postId);
  }
};
