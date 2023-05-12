module.exports = class ApiError extends Error {
  status;

  errors;

  constructor(status, messages, errors = []) {
    super(messages);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedException() {
    return new ApiError(401, 'User is not authorized');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
