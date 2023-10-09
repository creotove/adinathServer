const express = require("express");
const router = express.Router();

const { approveUser, rejectUser, purchaseCouponNew, rejectCouponPurchase } = require("../controllers/MasterAdminCtrl");


// Approve a user by ID
router.put('/approveUser/:userId', approveUser);

// Reject a user by ID
router.put('/rejectUser/:userId', rejectUser);


// Purchase a coupon Approval
router.post('/approveCouponPurchase', purchaseCouponNew);

// Reject a coupon purchase request
router.post('/rejectCouponPurchase', rejectCouponPurchase);



module.exports = router;

