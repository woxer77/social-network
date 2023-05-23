const router = require('express').Router();
const PostController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', authMiddleware, PostController.getAllPosts);
router.post('/', authMiddleware, PostController.createPost);
router.delete('/:id', authMiddleware, PostController.deletePost);

module.exports = router;
