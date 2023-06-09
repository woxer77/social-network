const PropTypes = require('prop-types');

module.exports = {
  userId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  country: PropTypes.string,
  phone: PropTypes.string,
  avatar: PropTypes.string,
  coverPhoto: PropTypes.string
};
