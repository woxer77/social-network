const router = require('express').Router();

const uploadMiddleware = require('../middlewares/multer-middleware');
const UserController = require('../controllers/user-controller');

router.post('/', uploadMiddleware.array('images', 8), UserController.uploadMultiple);
router.post('/cover-photo', uploadMiddleware.single('cover-photo'), UserController.uploadSingle);
router.post('/avatar', uploadMiddleware.single('avatar'), UserController.uploadSingle);

module.exports = router;
