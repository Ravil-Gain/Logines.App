const router = require('express').Router();
const User = require('../model/User');
const { loginValidation } = require('./util/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const log = require('./util/log');

router.post('/', async (req,res)=>{
    // validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // verification
    const user = await User.findOne({user_name: req.body.user_name});
    if(!user) return res.status(400).send('Email or password is wrong1');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong2');

    // assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN)
    res.header('auth-token', token).send(token);
    log('login', 'login', user.user_name);
});

module.exports = router;