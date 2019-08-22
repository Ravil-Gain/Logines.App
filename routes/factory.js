const router = require('express').Router();
const Factory = require('../model/Factory');
// get
router.get('/', async (req, res)=>{
    if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    const data = await Factory.find({});
    res.json(data);
});

//post
router.post('/', async (req, res)=>{
    // if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    const factory = new Factory({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        phone_number: req.body.phone_number,
        email: req.body.email,
        active: true,
    });
    try {
        const saveFactory = await factory.save();
        return res.send(saveFactory);
    } catch (error) {
        res.status(400).send(error);
    }
});

//delete
router.delete('/:id', (req, res)=>{
    res.json({
        someData:''
    });
});
//update

module.exports = router;