const express = require("express");
const {
    initiateCouponPurchase,
} = require("../controllers/retailerCtrl");
const router = express.Router()



router.post('/initiateCouponPurchase', initiateCouponPurchase);


module.exports = router;

