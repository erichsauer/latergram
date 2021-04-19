const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const comment = await Comment.insert({
        ...req.body,
        commentBy: req.user.userName
      });
      res.send(comment);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const comment = await Comment.delete(req.params.id, req.user.userName);
      res.send(comment);
    } catch (e) {
      next(e);
    }
  });