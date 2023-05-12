const router = require('express').Router();
const PostController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', authMiddleware, PostController.getAllPosts);
router.post('/', PostController.createPost);

module.exports = router;
