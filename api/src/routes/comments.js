const router = require('express').Router();
const CommentController = require('../controllers/comment-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/get', authMiddleware, CommentController.getAllCommentsOfPosts);
router.post('/create', authMiddleware, CommentController.createComment);
router.delete('/:id', authMiddleware, CommentController.deleteComment);

module.exports = router;
