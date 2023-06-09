const postService = require('../services/post-service');

module.exports = {
  async getAllPostsForUser(req, res, next) {
    try {
      const { userId } = req.params;

      const posts = await postService.getAllPostsForUser(userId);

      res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  },

  async getAllPostsOfUser(req, res, next) {
    try {
      const { userId } = req.params;
      const posts = await postService.getAllPostsOfUser(userId);

      res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  },

  async getAllLikes(req, res, next) {
    try {
      const { postId } = req.params;
      const usersId = await postService.getAllLikes(postId);

      res.status(200).json(usersId);
    } catch (e) {
      next(e);
    }
  },

  async createPost(req, res, next) {
    try {
      const {
        userId, text, images, availability, availabilityList, creationDate, creationTime
      } = req.body;
      const post = await postService.createPost(userId, text, images, availability, availabilityList, creationDate, creationTime);

      res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  },

  async likePost(req, res, next) {
    try {
      const { postId, userId } = req.params;
      const postLikes = await postService.likePost(userId, postId);

      res.status(200).json(postLikes);
    } catch (e) {
      next(e);
    }
  },

  async deletePost(req, res, next) {
    try {
      const postId = req.params.id;
      await postService.deletePost(postId);

      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
};
