const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
.get('/:id/posts', (req, res, next) => {
    try {
        const user = User.findUserNameWithPost(req.params.id)
        res.send(user)
    } catch(e) {
        next(e)
    }
})