const router = require('express').Router();
const UserWT = require('../model/UserWT');

// get
router.get('/', async (req, res) => {
    let data;
    switch (req.user.role) {
        case 'admin':
            data = await UserWT.find({});
            break;
        case 'manager':
            break;
        default:
            data = await UserWT.find({ user: req.user._id });
            break;
    }
    res.json(data);
});

//post
router.post('/', async (req, res) => {
    const userWT = new UserWT({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        lunch: req.body.lunch,
        description: req.body.description,
        commited_amount: 0,
        user: req.user._id,
        factory: req.user.factory,
    });
    try {
        const saveWT = await userWT.save();
        return res.send(saveWT);
    } catch (error) {
        res.status(400).send(error);
    }
});

//delete
router.delete('/', (req, res) => {
    res.json({
        someData: ''
    });
});

//update


module.exports = router;