const router = require('express').Router();
const postsService = require('../services/store/posts.service');

module.exports = router;

router.get('/', async (req, res) => {
  res.status(200).json(await postsService.getAllPosts());
});
