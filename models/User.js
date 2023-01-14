const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        maxLength:8
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
userSchema.pre("save",async function(){
    const salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
userSchema.methods.generateToken = async function(){
    return jwt.sign({_id:this._id},process.env.JWT_KEY);
}
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}
const User= mongoose.model("User",userSchema);
function userValidate(user){
    const schema = Joi.object({
        name:Joi.string().required(),
        password:Joi.string().min(5).max(8).required(),
        phone:Joi.number().required(),
        isAdmin:Joi.boolean().default(false)
    })
    return schema.validate(user)
}
exports.User= User;
exports.validate = userValidate;