const PropTypes = require('prop-types');

module.exports = {
  availabilityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  customStyles: PropTypes.object.isRequired
};
