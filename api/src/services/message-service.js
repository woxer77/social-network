const messageDbService = require('./message-db-service');

module.exports = {
  async addMessage(data) {
    await messageDbService.addMessage(data);
    const messages = messageDbService.getMessages(data.users[0], data.users[1]);

    return messages;
  },

  async getMessages(senderId, receiverId) {
    const messages = await messageDbService.getMessages(senderId, receiverId);

    return messages;
  }
};
