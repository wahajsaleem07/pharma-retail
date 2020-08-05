const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if(req.userData.role !== "Owner" && req.userData.role !== "Admin"){
            console.log(1);
            throw new Exception();
        }
        else{
            next();
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Authorization failed. Invalid token'
        });
    }
};