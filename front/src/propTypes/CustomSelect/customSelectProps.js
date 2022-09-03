const PropTypes = require('prop-types');

module.exports = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func,
  props: PropTypes.any
};
