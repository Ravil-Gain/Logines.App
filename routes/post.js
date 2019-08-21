const router = require('express').Router();
const verify = require('./verifyToken');

// get
router.get('/', verify, (req, res)=>{
    console.log('im here');
    
    res.json({
        someData: req.headers['auth-token']
    });
});

//post
router.post('/', verify, (req, res)=>{
    res.json({
        someData:''
    });
});

//delete
router.delete('/:id', verify, (req, res)=>{
    res.json({
        someData:''
    });
});
//update

module.exports = router;