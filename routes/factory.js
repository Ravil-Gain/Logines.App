const router = require('express').Router();
const Factory = require('../model/Factory');
const log = require('./util/log');

// get
router.get('/', async (req, res)=>{
    // if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    try {
        let data;
        switch (req.user.role) {
            case 'admin':
                data = await Factory.find({});
                break;
            case 'manager':
                break;
            default:
                data = await Factory.find({ _id: req.user.factories });
                break;
        }
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
});

//post
router.post('/', async (req, res)=>{
    if(req.user.role !== 'admin') return res.status(401).send('Access denied');
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
        res.send(saveFactory);
    } catch (error) {
        res.status(400).send(error);
    }
    log('Factory_created', factory.name, req.user.user_name);
});

//delete
router.delete('/:id', async (req, res)=>{
    if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    try {
        const data = await Factory.findByIdAndDelete({_id: req.params.id});
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
    log('Factory_removed', req.params.id, req.user.user_name);
});

//update
router.put('/:id', async (req, res)=>{
    if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    try {
        const factory = await Factory.findByIdAndDelete({_id: req.params.id});
        req.body.name ? factory.name = req.body.name : null;
        req.body.description ? factory.description = req.body.description : null;
        req.body.address ? factory.address = req.body.address : null;
        req.body.phone_number ? factory.phone_number = req.body.phone_number : null;
        req.body.email ? factory.email = req.body.email : null;
        req.body.active ? factory.active = req.body.active : null;
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
    log('Factory_edited', JSON.stringify(req.body), req.user.user_name);
});

module.exports = router;