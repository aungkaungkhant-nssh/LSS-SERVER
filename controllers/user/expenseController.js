const { validate, Expense } = require("../../models/Expense")

// @desc    createExpense
// @route   POST /api/expense/
// @access  protected
exports.createExpense= async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).json({message:error.details[0].message});
    const {expenseName,amount,description,date} = req.body;
    try{
        let expense = new Expense({
           expenseName,
           amount,
           description,
           date
        });
        expense = await expense.save();
        res.status(200).json({message:"Create expense Success",expense});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}


// @desc    getExpense
// @route   GET /api/expense/
// @access  protected
exports.getExpenses = async(req,res)=>{
    try{
        let expenses= await Expense.find().sort({date:1});
        
        res.status(200).json({message:"Get expenses",expenses})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}


// @desc    destroyExpense
// @route   DELETE /api/expense/
// @access  protected

exports.destroyExpense =  async (req,res)=>{
    const {expenseId} = req.params;
    try{
        const expense = await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({message:"Delete Expense Success",expense});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}