const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) =>{
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    const emailCheck = await User.findOne({email: req.body.email});
    if(emailCheck) return res.status(400).send('Email alredy exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const saveUser = await user.save();
        return res.send(saveUser);
    }catch(error){
        res.status(400).send(error);
    }
    res.send('register');
});

router.post('/login', async (req,res)=>{
    const { error } = loginValidation(req.body);
    if (error) return req.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong1');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong2');
    const token = jwt.sign({_id: user._id}, process.env.TOKEN)
    res.header('auth-token', token).send(token);
});
module.exports = router;