const router = require('express').Router();
const likedUserPostService = require('../services/store/liked-user-post.service');

module.exports = router;

router.get('/:id', async (req, res) => {
  res.status(200).json(await likedUserPostService.getUsersWhoLikedPost(req.params.id));
});
