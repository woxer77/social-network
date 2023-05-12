const router = require('express').Router();
const likedUserPostService = require('../services/liked-user-post-service');

router.get('/:id', async (req, res) => {
  try {
    res.status(200).json(await likedUserPostService.getUsersWhoLikedPost(req.params.id));
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
