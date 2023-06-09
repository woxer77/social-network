const PropTypes = require('prop-types');

module.exports = {
  customClassName: PropTypes.string,
  withButtons: PropTypes.bool,
  multiline: PropTypes.bool,
  setInputActive: PropTypes.func,
  handleEmojiClick: PropTypes.func,
  emojiPickerButtonRef: PropTypes.oneOfType([PropTypes.object, PropTypes.element])
};
