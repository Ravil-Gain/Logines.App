const router = require('express').Router();
const Post = require('../model/Post');
const log = require('./util/log');
// const jwt = require('jsonwebtoken');

// get
router.get('/', async (req, res) => {
    // const token = jwt.sign("5d5fedbe9d537344978e4a01", process.env.TOKEN)
    // res.header('auth-token', token).send(token);
    // res.json({
    //     someData: req.headers['auth-token']
    // });
    let data = await Post.find();

    res.json(data);
});

//post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        // author: req.user._id,
        body: req.body.body,
        active: true
    })
    try {
        const savePost = await post.save();
        res.send(savePost);
    } catch (error) {
        res.status(400).send(error);
    }
    return log('new Post', user.user_name, req.user.user_name);
});

//delete
router.delete('/:id', (req, res) => {
    res.json({
        someData: ''
    });
});
// put

module.exports = router;