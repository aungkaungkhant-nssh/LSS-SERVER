const mongoose= require("mongoose");
const Joi = require("joi");
const fundSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    conditions:[
        {type:Number,default:0},
        {type:Number,default:0},
        {type:Number,default:0},
        {type:Number,default:0},
    ],
    year:{
        type:String,
        required:true
    },
    major:{
        type:Number,
        required:true
    }
})

const Fund = mongoose.model("Fund",fundSchema);
function fundValidate (fund){
    const schema = Joi.object({
        name:Joi.string().required(),
        semester:Joi.number().required(),
        year:Joi.string().required(),
        major:Joi.number().required()
    })
    return schema.validate(fund)
}
exports.Fund =  Fund;
exports.validate = fundValidate
