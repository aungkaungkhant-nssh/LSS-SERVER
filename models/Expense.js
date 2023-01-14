const mongoose = require("mongoose");
const Joi  =require('joi')
const expenseSchema = new mongoose.Schema({
    expenseName:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
  
})

const Expense = mongoose.model("Expense",expenseSchema);


function expenseValidate(expense){
    const schema = Joi.object({
        expenseName:Joi.string().required(),
        amount:Joi.number().required(),
        description:Joi.string().required(),
        date:Joi.string().required()
    })
    return schema.validate(expense)
}
exports.Expense = Expense;
exports.validate= expenseValidate