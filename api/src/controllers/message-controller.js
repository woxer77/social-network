const messageService = require('../services/message-service');

module.exports = {
  async addMessage(req, res, next) {
    try {
      const data = req.body;
      const messages = await messageService.addMessage(data);

      res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  },

  async getMessages(req, res, next) {
    try {
      const { senderId, receiverId } = req.params;
      const messages = await messageService.getMessages(senderId, receiverId);

      res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }
};
