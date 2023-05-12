const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const tokenDbService = require('./token-db-service');

module.exports = {
  generateTokens(payload) {
    const accessToken = jwt.sign(
      payload,
      config.accessTokenSecret,
      { expiresIn: config.accessTokenTimeline }
    );
    const refreshToken = jwt.sign(
      payload,
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenTimeline }
    );

    return { accessToken, refreshToken };
  },

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, config.accessTokenSecret);
      return userData;
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, config.refreshTokenSecret);
      return userData;
    } catch (e) {
      return null;
    }
  },

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenDbService.getTokenById(userId);
    const newTokenData = {
      user_id: userId,
      refresh_token: refreshToken
    };

    if (tokenData) {
      await tokenDbService.updateTokenById(userId, newTokenData);
      return 1;
    }

    await tokenDbService.createToken(newTokenData);
    return 0;
  },

  async removeToken(refreshToken) {
    await tokenDbService.removeToken(refreshToken);
    return 1;
  },

  async findToken(refreshToken) {
    const tokenData = await tokenDbService.getTokenByToken(refreshToken);
    return tokenData;
  }
};
