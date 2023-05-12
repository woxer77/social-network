const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.post('/', UserController.logout);

module.exports = router;
