const jwt = require('jsonwebtoken');
const User = require('../../model/User');

module.exports = async(req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');
    try{
        const verified = await jwt.verify(token, process.env.TOKEN);
        const user = await User.findOne({ _id: verified._id });
        if (!user.active) return res.status(401).send('Inactive user');
        req.user = user;
        next();
    }catch(error){
        console.log(error);
        res.status(400).send('Invalid token');
    }
}