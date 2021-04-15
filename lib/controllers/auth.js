const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
  .get('/login', async (req, res, next) => {
    try {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`
      );
    } catch (e) {
      next(e);
    }
  })
  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await UserService.create(req.query.code);
      res.send(user);
    } catch (e) {
      next(e);
    }
  });
