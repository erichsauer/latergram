const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Post = require('../models/Post');

module.exports = Router()
.post('/', ensureAuth, async (req, res, next) => {
    try {
        const post = await Post.insert({ 
            ...req.body,
            userName: req.user.userName
        })
        res.send(post)
    } catch(e) {
        next(e)
    }
})