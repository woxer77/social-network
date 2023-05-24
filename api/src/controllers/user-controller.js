const userService = require('../services/user-service');
const config = require('../configs/config');
const tokenTimelineToMs = require('../helpers/tokenTimelineToMs');
// какие-то данные принимает, и какие-то данные отдаёт сервисам с бизнес логикой
module.exports = {
  async getUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);

      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  },

  async registration(req, res, next) {
    try {
      const {
        email, password, firstName, secondName, dateOfBirth, gender
      } = req.body;
      const userData = await userService.registration(email, password, firstName, secondName, dateOfBirth, gender);
      const refreshMaxAge = tokenTimelineToMs(config.refreshTokenTimeline);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: refreshMaxAge, httpOnly: true });

      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      const refreshMaxAge = tokenTimelineToMs(config.refreshTokenTimeline);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: refreshMaxAge, httpOnly: true, secure: config.developmentStage === 'production', sameSite: config.developmentStage === 'production' ? 'none' : 'strict'
      });

      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  },

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'You have successfully logged out of your account' });
    } catch (e) {
      return next(e);
    }
  },

  async emailActivation(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.emailActivation(activationLink);

      res.redirect(config.clientUrl);
    } catch (e) {
      next(e);
    }
  },

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log('api refreshToken:', refreshToken);
      const userData = await userService.refresh(refreshToken);
      const refreshMaxAge = tokenTimelineToMs(config.refreshTokenTimeline);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: refreshMaxAge, httpOnly: true });
      console.log('success');

      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  }
};
