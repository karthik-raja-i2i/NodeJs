/* These methods act as authorization filters to different routes */
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
let userId = 0;

// verifies if the jwt token is valid. If valid, the user id is set in the 
// request object
verifyToken = (req,res,next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        res.status(403).send({
            message: 'auth token missing'
        })
        return
    }

    jwt.verify(token,config.secretKey,(err,user) => {
        if(err) {
            res.status(401).send({
                message: 'Unauthorized'
            });
        }
        userId = user.data.id;
        req.userId = user.data.id;
        next();
    })
}

permittedRoles = (...allowedRoles) => {
    const isAllowed = role => allowedRoles.indexOf(role) > -1;
    
    // return a middleware
    return (req, res, next) => {
        User.findByPk(userId).then(user => {
            user.getRole().then(role => {
                if (isAllowed(role.name)) {
                    next(); // role is allowed, so continue on the next middleware
                } else {
                    res.status(403).send({
                        message: 'Not authorized'
                    })                
                }
            })
        })
    }
}

const authJwt = {
    verifyToken: verifyToken,
    hasPermission: permittedRoles
};

module.exports = authJwt;