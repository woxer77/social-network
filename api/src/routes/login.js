const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.post('/', UserController.login);

module.exports = router;
