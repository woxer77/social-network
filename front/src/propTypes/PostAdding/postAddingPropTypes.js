const PropTypes = require('prop-types');

module.exports = {
  inputActive: PropTypes.bool.isRequired,
  setInputActive: PropTypes.func.isRequired,
  setAvailability: PropTypes.func.isRequired,
  availabilityOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  customStyles: PropTypes.object.isRequired
};
