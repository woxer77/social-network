const postService = require('../services/post-service');

module.exports = {
  async getAllPosts(req, res, next) {
    try {
      const { page } = req.body;
      const posts = await postService.getAllPosts(page);

      res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  },

  async createPost(req, res, next) {
    try {
      const {
        userId, text, images, availability, creationDate, creationTime
      } = req.body;
      const post = await postService.createPost(userId, text, images, availability, creationDate, creationTime);

      res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  }
};
