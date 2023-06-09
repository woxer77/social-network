const commentsDbService = require('./comment-db-service');

module.exports = {
  async getAllCommentsOfPosts(postsId) {
    const comments = await commentsDbService.getAllCommentsOfPosts(postsId);
    return comments;
  },
  async createComment(userId, postId, text, creationDate, creationTime) {
    const commentId = await commentsDbService.createComment({
      user_id: userId,
      post_id: postId,
      text,
      creation_date: creationDate,
      creation_time: creationTime
    });

    return commentId;
  },
  async deleteComment(commentId) {
    await commentsDbService.deleteCommentById(commentId);
  }
};
