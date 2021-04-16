const { Router } = require('express');
const UserService = require('../services/UserService');
const ensureAuth = require('../middleware/ensureAuth');
const { sign } = require('../utils/jwt')

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

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
 
  // res.stuff might not work
  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await UserService.create(req.query.code);
      res.send(user)
      .cookie('session', sign(user), {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
        sameSite: 'strict',
      })
      .redirect('/');
    } catch (e) {
      next(e);
    }
  })

.get('/verify', ensureAuth, (req, res, next) => {
  res.send(req.user);
});
