const router = require('express').Router();

// get
router.get('/', (req, res)=>{
    // if(req.user.role !== 'admin') return res.status(401).send('Access denied');
    const data = await Factory.find({});
    res.json(data);
});

//post
router.post('/', (req, res)=>{
    res.json({
        someData:''
    });
});

//delete
router.delete('/:id', (req, res)=>{
    res.json({
        someData:''
    });
});
//update

module.exports = router;