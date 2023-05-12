const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.get('/:link', UserController.emailActivation);

module.exports = router;
