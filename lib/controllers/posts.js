const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const post = await Post.insert({
        ...req.body,
        userName: req.user.userName,
      });
      res.send(post);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.send(posts);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const post = await Post.getById(req.params.id);
      res.send(post);
    } catch (e) {
      next(e);
    }
  })
  .patch('/:id', ensureAuth, async (req, res, next) => {
    try {
      const post = await Post.update(req.params.id, {
        ...req.body,
        userName: req.user.userName,
      });
      res.send(post);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const post = await Post.delete(req.params.id, req.user.userName);
      res.send(post);
    } catch (e) {
      next(e);
    }
  });
