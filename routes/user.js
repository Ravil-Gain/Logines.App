const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('./util/validation');
const bcrypt = require('bcryptjs');
const log = require('./util/log');

router.post('/register', async (req, res) => {
    if (req.user.role !== 'admin') return res.status(401).send('Access denied');
    // validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // login
    const user_nameCheck = await User.findOne({ user_name: req.body.user_name });
    if (user_nameCheck) return res.status(400).send('user_name alredy exist');

    // email
    const emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck) return res.status(400).send('Email alredy exist');

    // user name
    const user_name = await User.findOne({ user_name: req.body.user_name });
    if (user_name) return res.status(400).send('user_name alredy exist');

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
        password: await hashPassword(req.body.password),
        role: 'worker',
        active: true
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
    log('registration', user.user_name, req.user.user_name);
});

// get
router.get('/', async (req, res) => {
    let data;
    switch (req.user.role) {
        case 'admin':
            data = await User.find({});
            break;
        default:
            data = await User.find({ _id: req.user._id });
            break;
    }
    res.json(data);
});

router.get('/:id', async (req, res) => {
    if (req.user.role !== 'admin') return res.status(401).send('Access denied');
    const data = await User.findById({ _id: req.params.id });
    res.json(data);
});

//post
router.put('/:id', async (req, res) => {
    if (req.user.role !== 'admin') return res.status(401).send('Access denied');
    const user = await User.findById({ _id: req.params.id });
    if (!user) return res.status(404).send('Id not found');
    req.body.first_name ? user.first_name = req.body.first_name : null;
    req.body.middle_name ? user.middle_name = req.body.middle_name : null;
    req.body.last_name ? user.last_name = req.body.last_name : null;
    req.body.date_of_birth ? user.date_of_birth = req.body.date_of_birth : null;
    req.body.address ? user.address = req.body.address : null;
    req.body.phone_number ? user.phone_number = req.body.phone_number : null;
    req.body.email ? user.email = req.body.email : null;
    req.body.user_name ? user.user_name = req.body.user_name : null;
    req.body.role ? user.role = req.body.role : null;
    req.body.active ? user.active = req.body.active : null;
    req.body.factories ? user.factories = req.body.factories : null;
    // password
    if (req.body.password) {
        user.password = await hashPassword(req.body.password);
    }
    try {
        const save = await user.save();
        res.send(save);
    } catch (error) {
        res.status(400).send(error);
    }
    return log('edit_User', JSON.stringify(req.body), req.user.user_name);
});

//delete
router.delete('/:id', async (req, res) => {
    if (req.user.role !== 'admin') return res.status(401).send('Access denied');

    res.json({
        someData: ''
    });

});
//update

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = router;