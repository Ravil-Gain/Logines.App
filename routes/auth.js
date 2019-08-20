const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) =>{
    // validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // email
    const emailCheck = await User.findOne({email: req.body.email});
    if(emailCheck) return res.status(400).send('Email alredy exist');

    // password 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const user = new User({
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        phone_number: req.body.phone_number,
        email: req.body.email,
        user_name: req.body.user_name,
        password: hashPassword,
        role: 'worker',
        active: true
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
    // validation
    const { error } = loginValidation(req.body);
    if (error) return req.status(400).send(error.details[0].message);

    // verification
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong1');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong2');

    // assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN)
    res.header('auth-token', token).send(token);
});

module.exports = router;
