const router = require('express').Router();
const Factory = require('../model/Factory');
// get
router.get('/', async (req, res)=>{
    if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    try {
        const data = await Factory.find({});
        return res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
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
router.delete('/:id', async (req, res)=>{
    if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    try {
        const data = await Factory.findByIdAndDelete({_id: req.params.id});
        return res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
});

//update
router.put('/:id', async (req, res)=>{
    if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    try {
        const data = await Factory.findByIdAndDelete({_id: req.params.id});
        return res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;