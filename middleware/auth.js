const jwt = require('jsonwebtoken');
const {User} =require('../models/User');
exports.isUserAuth = async(req,res,next)=>{
    let token = getToken(req);
    if(!token) return res.status(401).json({message:"Unauthorized"});
    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        let user = await User.findById(decoded._id);
        if(!user) return res.status(401).json({message:"Invalid Token"})
        req.user =user;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid Token"})
    }
}

function getToken (req){
    const authorization = req.headers.authorization;
    if(!authorization) return false;
    return authorization.split(" ")[1];
}