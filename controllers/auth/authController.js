const {User,validate} = require("../../models/User");
const _ = require('lodash');
const Joi = require('joi');
exports.login = async(req,res)=>{
    const {error} = loginValidate(req.body);
  

    if(error) return res.status(400).json({message:error.details[0].message});
    const {phone,password,isAdmin} = req.body;
   
    try{
       let user = await User.findOne({phone});
       if(user &&  await user.matchPassword(password)){
            if(user.isAdmin !== isAdmin){
                return res.status(401).json({message:"Your role is not found"});
            }
            let token = await user.generateToken();
            res.status(200).json({message:"Login Success",user:{..._.pick(user,["_id","name","phone","isAdmin"]),token}})
       }else{
         res.status(400).json({message:"Your Phone Number Or Password Invalid"})
       }
    }catch(err){
        res.status(500).json({message:err});
    }
}
exports.register = async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).json({message:error.details[0].message});
    const {name,phone,password} = req.body;
    try{
        let user = new User({name,phone,password});
        let token =await user.generateToken();
        user = await user.save();
        res.status(201).json({message:"Register Success",user:{..._.pick(user,["_id","name","phone","isAdmin"]),token}});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
    
}

function loginValidate(user){
    const schema = Joi.object({
        phone:Joi.number().required(),
        password:Joi.string().required(),
        isAdmin:Joi.boolean().default(false)
    })
    return schema.validate(user)
}