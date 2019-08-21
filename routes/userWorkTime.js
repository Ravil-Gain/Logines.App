const router = require('express').Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');

// get
router.get('/', verify, (req, res)=>{

    res.json({ user: req.user._id });
});

//post
router.post('/', verify, (req, res)=>{
    res.json({
        someData:''
    });
});

//delete
router.delete('/', verify, (req, res)=>{
    res.json({
        someData:''
    });
});

//update


module.exports = router;