const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Post = require('../models/Post');

module.exports = Router()
.get('/', async (req, res, next) => {
  try {
    const post = await Post.getPopular();
    res.send(post);
  } catch (e) {
    next(e);
  }
})
