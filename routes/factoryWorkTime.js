const router = require('express').Router();
const FactoryWT = require('../model/FactoryWT');
const log = require('./util/log');

// get
router.get('/', async (req, res)=>{
    // const user = await User.findOne({ _id: req.user._id });
    let data;
    switch (req.user.role) {
        case 'admin':
            data = await FactoryWT.find({});
            break;
        case 'manager':
            break;
        default:
            data = await FactoryWT.find({ user: req.user._id });
            break;
    }
    res.json(data);
});

//post
router.post('/', async (req, res)=>{
    const factoryWT = new FactoryWT({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        amount: req.body.amount,
        description: req.body.description,
        factory: req.body.factory,
        user: req.body.user,
    });
    try {
        const saveWT = await factoryWT.save();
        res.send(saveWT);
    } catch (error) {
        res.status(400).send(error);
    }
    log('FactoryWT', factoryWT._id, req.user.user_name);
});

//delete

//update

module.exports = router;