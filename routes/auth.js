const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) =>{
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    const emailCheck = await User.findOne({email: req.body.email});
    if(emailCheck) return res.status(400).send('Email alredy exist');

    const salt = bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{

        const saveUser = await user.save();
        res.send(saveUser);
    }catch(error){
        res.status(400).send(error);
    }
    res.send('register');
});

module.exports = router;