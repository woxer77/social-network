const PropTypes = require('prop-types');

module.exports = {
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  creationTime: PropTypes.string.isRequired,
  likesNumber: PropTypes.number.isRequired,
  commentsNumber: PropTypes.number.isRequired,
  orderedData: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      rows: PropTypes.number.isRequired,
      cols: PropTypes.number
    })
  ),
  imageListCols: PropTypes.number
};
