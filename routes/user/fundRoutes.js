const express = require("express");
const { allFunds, getFund,destroyFund,createFund,updateFund } = require("../../controllers/user/fundController");
const router = express.Router();
const {isUserAuth} = require('../../middleware/auth');

router.get("/",isUserAuth,allFunds);
router.get('/:fundId',isUserAuth,getFund);
router.post('/',isUserAuth,createFund);
router.delete('/:fundId',isUserAuth,destroyFund);
router.put('/:fundId',isUserAuth,updateFund)
module.exports = router;