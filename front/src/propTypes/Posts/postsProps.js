const PropTypes = require('prop-types');

module.exports = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      post_id: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      availability: PropTypes.string.isRequired,
      creation_date: PropTypes.string.isRequired,
      creation_time: PropTypes.string.isRequired,
      likes_number: PropTypes.number.isRequired,
      comments_number: PropTypes.number.isRequired,
      images: PropTypes.string
    })
  )
};