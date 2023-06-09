const PropTypes = require('prop-types');

module.exports = {
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  creationTime: PropTypes.string.isRequired,
  imagesData: PropTypes.string,
  comments: PropTypes.array,
  likes: PropTypes.array
};
