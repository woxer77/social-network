const router = require('express').Router();
const PostController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/:postId', authMiddleware, PostController.getAllLikes);

module.exports = router;
