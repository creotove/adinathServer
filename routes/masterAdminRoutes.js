const express = require("express");
const router = express.Router();

const { approveUser, rejectUser, purchaseCouponNew, rejectCouponPurchase, getUserForApproval } = require("../controllers/MasterAdminCtrl");


// Approve a user by ID
router.patch('/approveUser/:uniqueId', approveUser);

// Reject a user by ID
router.patch('/rejectUser/:uniqueId', rejectUser);


// Purchase a coupon Approval
router.post('/approveCouponPurchase', purchaseCouponNew);

// Reject a coupon purchase request
router.post('/rejectCouponPurchase', rejectCouponPurchase);

// Get all users for approval
router.get('/getUserForApproval', getUserForApproval);



module.exports = router;

