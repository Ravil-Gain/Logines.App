const router = require('express').Router();

// get
router.get('/', (req, res)=>{
    console.log('im here');
    
    res.json({
        someData: req.headers['auth-token']
    });
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
// put

module.exports = router;