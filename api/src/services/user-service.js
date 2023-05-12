const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const userDbService = require('./user-db-service');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const config = require('../configs/config');
const ApiError = require('../exceptions/api-error');

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
      dateOfBirth: user.date_of_birth,
      gender: user.gender
    };

    await mailService.sendActivationLink(email, `${config.apiUrl}/email-activation/${activationLink}`);
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
      dateOfBirth: user.date_of_birth,
      gender: user.gender
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
      dateOfBirth: user.date_of_birth,
      gender: user.gender
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
  }
};
