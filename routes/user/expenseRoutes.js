const express= require("express");
const { createExpense ,getExpenses,destroyExpense} = require("../../controllers/user/expenseController");
const router = express.Router();
const {isUserAuth} = require('../../middleware/auth');


router.get("/",isUserAuth,getExpenses);
router.post("/",isUserAuth,createExpense)
router.delete("/:expenseId",isUserAuth,destroyExpense);
module.exports = router;
