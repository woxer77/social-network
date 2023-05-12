const PropTypes = require('prop-types');

module.exports = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  iconId: PropTypes.string.isRequired,
  customClassName: PropTypes.string
};
