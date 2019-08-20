const router = require('express').Router();
const verify = require('./verifyToken');

// get
router.get('/', verify, (req, res)=>{
    res.json({
        someData:''
    });
});

//post

//delete

//update

module.exports = router;