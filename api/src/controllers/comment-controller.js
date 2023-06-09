const commentService = require('../services/comment-service');

module.exports = {
  async getAllCommentsOfPosts(req, res, next) {
    try {
      const postsId = req.body;
      const comments = await commentService.getAllCommentsOfPosts(postsId);

      res.status(200).json(comments);
    } catch (e) {
      next(e);
    }
  },
  async createComment(req, res, next) {
    try {
      const {
        userId, postId, text, creationDate, creationTime
      } = req.body;
      await commentService.createComment(userId, postId, text, creationDate, creationTime);

      res.status(200).json({ message: 'You have successfully created a comment to post' });
    } catch (e) {
      next(e);
    }
  },
  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.id;
      await commentService.deleteComment(commentId);

      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
};
