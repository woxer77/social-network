const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.get('/', UserController.refresh);

module.exports = router;
