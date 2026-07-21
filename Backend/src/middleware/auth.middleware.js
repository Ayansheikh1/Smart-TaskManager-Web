const jwt = require('jsonwebtoken');
const tokenBlaclistModel = require('../models/blackList.model')

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            messsage:"token not provided!"
        });

    }

    const isTokenBlacklisted = await tokenBlaclistModel.findOne({token});

    if(isTokenBlacklisted){
        return res.status(401).json({
            messsage:"token is invalid"
        });
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            message:"Token invalid"
        })
    }

}

module.exports = {authUser}