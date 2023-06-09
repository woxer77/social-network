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

  async getUsersByIds(req, res, next) {
    try {
      const usersIds = req.body;
      const users = await userService.getUsersByIds(usersIds);

      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  },

  async updateUserCoverPhoto(req, res, next) {
    try {
      const { userId, filename } = req.body;
      const coverPhoto = await userService.updateUserCoverPhoto(userId, filename);

      res.status(200).json(coverPhoto);
    } catch (e) {
      next(e);
    }
  },

  async updateUserAvatar(req, res, next) {
    try {
      const { userId, filename } = req.body;
      const avatar = await userService.updateUserAvatar(userId, filename);

      res.status(200).json(avatar);
    } catch (e) {
      next(e);
    }
  },

  async updateUser(req, res, next) {
    try {
      const { userId, data } = req.body;
      const dataWithUnderline = {
        first_name: data.firstName,
        second_name: data.secondName,
        email: data.email,
        country: data.country,
        phone: data.phone,
        password: data.password,
        date_of_birth: data.dateOfBirth,
        gender: data.gender
      };
      await userService.updateUser(userId, dataWithUnderline);

      res.status(200).json({ message: 'You have successfully updated your account info' });
    } catch (e) {
      next(e);
    }
  },

  async updateFollowing(req, res, next) {
    try {
      const { userId, userFollowing } = req.body;
      const userFollowingPayload = await userService.updateFollowing(userId, userFollowing);

      res.status(200).json(userFollowingPayload[0]?.following);
    } catch (e) {
      next(e);
    }
  },

  async updateFollowers(req, res, next) {
    try {
      const { userId, userFollowers } = req.body;
      const userFollowersPayload = await userService.updateFollowers(userId, userFollowers);

      res.status(200).json(userFollowersPayload[0]?.followers);
    } catch (e) {
      next(e);
    }
  },

  async getUserFollowers(req, res, next) {
    try {
      const { userId } = req.params;
      const userFollowers = await userService.getUserFollowers(userId);

      res.status(200).json(userFollowers.followers);
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

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: refreshMaxAge, httpOnly: true, secure: config.developmentStage === 'production', sameSite: config.developmentStage === 'production' ? 'none' : 'strict'
      });

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
      const userData = await userService.refresh(refreshToken);
      const refreshMaxAge = tokenTimelineToMs(config.refreshTokenTimeline);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: refreshMaxAge, httpOnly: true, secure: config.developmentStage === 'production', sameSite: config.developmentStage === 'production' ? 'none' : 'strict'
      });

      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  },

  async uploadMultiple(req, res, next) {
    try {
      if (req.files) {
        return res.json(req.files);
      }
      return null;
    } catch (e) {
      return next(e);
    }
  },

  async uploadSingle(req, res, next) {
    try {
      if (req.file) {
        return res.json(req.file);
      }
      return null;
    } catch (e) {
      return next(e);
    }
  }
};
