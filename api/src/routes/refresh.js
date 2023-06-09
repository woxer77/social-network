const router = require('express').Router();
const UserController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', authMiddleware, UserController.refresh);

module.exports = router;
