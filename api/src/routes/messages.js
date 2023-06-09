const router = require('express').Router();
const MessageController = require('../controllers/message-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', authMiddleware, MessageController.addMessage);
router.get('/:senderId/:receiverId', authMiddleware, MessageController.getMessages);

module.exports = router;
