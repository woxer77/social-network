const router = require('express').Router();
const PostController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/:userId', authMiddleware, PostController.getAllPostsForUser);
router.get('/user/:userId', authMiddleware, PostController.getAllPostsOfUser);
router.post('/', authMiddleware, PostController.createPost);
router.post('/:postId/:userId/likes', authMiddleware, PostController.likePost);
router.delete('/:id', authMiddleware, PostController.deletePost);

module.exports = router;
