const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const userDbService = require('./user-db-service');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const config = require('../configs/config');
const ApiError = require('../exceptions/api-error');

/* eslint-disable no-param-reassign */

module.exports = {
  async registration(email, password, firstName, secondName, dateOfBirth, gender) {
    const candidate = await userDbService.getUserByEmail(email);
    if (candidate) {
      throw ApiError.BadRequest('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();
    await userDbService.createUser({
      email,
      password: hashedPassword,
      first_name: firstName,
      second_name: secondName,
      date_of_birth: dateOfBirth,
      gender,
      activation_link: activationLink
    });
    const user = await userDbService.getUserByEmail(email);
    const userPayload = {
      userId: user.user_id,
      email: user.email,
      firstName: user.first_name,
      secondName: user.second_name,
      avatar: user.avatar,
      dateOfBirth: user.date_of_birth,
      gender: user.gender,
      isEmailActivated: user.is_email_activated,
      following: user.following,
      followers: user.followers
    };

    await mailService.sendActivationLink(
      email,
      `${config.apiUrl}/email-activation/${activationLink}`
    );
    const tokens = tokenService.generateTokens(userPayload);
    await tokenService.saveToken(user.user_id, tokens.refreshToken);

    return { ...tokens, user: userPayload };
  },

  async emailActivation(activationLink) {
    const user = await userDbService.getUserByActivationLink(activationLink);
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link.');
    }

    user.is_email_activated = true;
    await userDbService.updateUser(user.user_id, user);
  },

  async login(email, password) {
    const user = await userDbService.getUserByEmail(email);
    if (!user) {
      throw ApiError.BadRequest('User with this email was not found.');
    }

    const isPasswordsEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordsEquals) {
      throw ApiError.BadRequest('Incorrect password.');
    }

    const userPayload = {
      userId: user.user_id,
      email: user.email,
      firstName: user.first_name,
      secondName: user.second_name,
      avatar: user.avatar || 'default-user-image.png',
      dateOfBirth: user.date_of_birth,
      gender: user.gender,
      isEmailActivated: user.is_email_activated,
      following: user.following,
      followers: user.followers
    };
    const tokens = tokenService.generateTokens(userPayload);
    await tokenService.saveToken(user.user_id, tokens.refreshToken);

    return { ...tokens, user: userPayload };
  },

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
    return 1;
  },

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedException();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedException();
    }

    const user = await userDbService.getUserById(tokenFromDb.user_id);
    const userPayload = {
      userId: user.user_id,
      email: user.email,
      firstName: user.first_name,
      secondName: user.second_name,
      avatar: user.avatar,
      dateOfBirth: user.date_of_birth,
      gender: user.gender,
      isEmailActivated: user.is_email_activated,
      following: user.following,
      followers: user.followers
    };
    const tokens = tokenService.generateTokens(userPayload);
    await tokenService.saveToken(user.user_id, tokens.refreshToken);

    return { ...tokens, user: userPayload };
  },

  async getUserById(userId) {
    const user = await userDbService.getUserById(userId);
    if (!user) {
      throw ApiError.BadRequest('User with this id was not found.');
    }

    return user;
  },

  async getUsersByIds(usersIds) {
    const users = await userDbService.getUsersByIds(usersIds);
    if (!users) {
      throw ApiError.BadRequest('Users with this ids were not found.');
    }

    const usersPayload = users.map(user => ({
      userId: user.user_id,
      email: user.email,
      firstName: user.first_name,
      secondName: user.second_name,
      avatar: user.avatar,
      dateOfBirth: user.date_of_birth,
      gender: user.gender,
      isEmailActivated: user.is_email_activated,
      following: user.following,
      followers: user.followers
    }));

    return usersPayload;
  },

  async updateUserCoverPhoto(userId, filename) {
    const coverPhoto = await userDbService.updateUserCoverPhoto(userId, filename);

    return coverPhoto;
  },

  async updateUserAvatar(userId, filename) {
    const avatar = await userDbService.updateUserAvatar(userId, filename);

    return avatar;
  },

  async updateUser(userId, data) {
    const candidate = await userDbService.getUserByEmail(data.email);

    if (candidate && candidate.email === data.email && candidate.user_id !== userId) {
      throw ApiError.BadRequest('User with this email already exists.');
    } else {
      const activationLink = uuid.v4();
      data.is_email_activated = false;
      data.activation_link = activationLink;
      await mailService.sendActivationLink(
        data.email,
        `${config.apiUrl}/email-activation/${activationLink}`
      );
    }

    if (!data.password) {
      delete data.password;
    } else {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await userDbService.updateUser(userId, data);
  },

  async updateFollowing(userId, userFollowing) {
    const userFollowingPayload = await userDbService.updateFollowing(userId, userFollowing);

    return userFollowingPayload;
  },

  async updateFollowers(userId, userFollowers) {
    const userFollowersPayload = await userDbService.updateFollowers(userId, userFollowers);

    return userFollowersPayload;
  },

  async getUserFollowers(userId) {
    const userFollowers = await userDbService.getUserFollowers(userId);

    return userFollowers;
  }
};
