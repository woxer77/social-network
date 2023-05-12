const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    const { message, errors } = err;
    return res.status(err.status).json({ message, errors });
  }

  return res.status(500).send({ message: 'Unexpected error' });
};
