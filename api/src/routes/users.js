const router = require('express').Router();
const UserController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/:id', authMiddleware, UserController.getUserById);
router.post('/get-users-by-ids', authMiddleware, UserController.getUsersByIds);
router.put('/cover-photo', authMiddleware, UserController.updateUserCoverPhoto);
router.put('/avatar', authMiddleware, UserController.updateUserAvatar);
router.put('/', authMiddleware, UserController.updateUser);
router.put('/following', authMiddleware, UserController.updateFollowing);
router.put('/followers', authMiddleware, UserController.updateFollowers);
router.get('/:userId/followers', authMiddleware, UserController.getUserFollowers);

module.exports = router;
