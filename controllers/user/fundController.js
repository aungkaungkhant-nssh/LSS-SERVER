const {Fund,validate} = require('../../models/Fund');



// @desc    allFunds
// @route   GEt /api/fund
// @access  protected
exports.allFunds =async(req,res)=>{
    try{
        const funds = await Fund.find();
        res.status(200).json({message:"Get All Funds Success",funds});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

// @desc    getFund
// @route   GET /api/fund/:fundId
// @access  protected
exports.getFund = async (req,res)=>{
    const {fundId} = req.params;
    try{
        const fund = await Fund.findById(fundId);
        res.status(200).json({message:"Get Fund Success",fund});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

// @desc    destroyFund
// @route   DELETE /api/fund/:fundId
// @access  protected
exports.destroyFund = async(req,res)=>{
    const {fundId} = req.params;
    try{
        const fund = await Fund.findByIdAndDelete(fundId);
        res.status(200).json({message:"Get Fund Success",fund});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}


// @desc    createFund
// @route   POST /api/fund/
// @access  protected

exports.createFund = async(req,res)=>{
    const {name,semester,major,year,conditions} = req.body;
    const {error} = validate({name,semester,major,year});
    if(error) return res.status(400).json({message:error.details[0].message});
   
    try{
        let fund = new Fund({
            name,
            semester,
            conditions:conditions || [0,0,0,0],
            major,
            year
        });
        fund = await fund.save();
        res.status(200).json({message:"Get Fund Success",fund});
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"});
    }
}


// @desc    updateFund
// @route   PUT /api/fund/
// @access  protected

exports.updateFund = async(req,res)=>{
    const {fundId} = req.params;
    const {name,semester,major,year,conditions} = req.body;
    const {error} = validate({name,semester,major,year});
    if(error) return res.status(400).json({message:error.details[0].message});
    try{
        let fund = await Fund.findByIdAndUpdate(fundId,{name,semester,major,year,conditions});
        fund = await Fund.findById(fundId);
        return res.status(200).json({message:"Update Fund",fund})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"});
    }
}