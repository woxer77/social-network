const router = require('express').Router();
const usersService = require('../services/store/users.service');

module.exports = router;

router.get('/:id', async (req, res) => {
  res.status(200).json(await usersService.getUserById(req.params.id));
});
