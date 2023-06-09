const PropTypes = require('prop-types');

module.exports = {
  commentId: PropTypes.number.isRequired,
  creationDate: PropTypes.string.isRequired,
  creationTime: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};
