const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  login,
  createUser,
  changeCouponPrice,
  getUserCommission,
  setAccountDetails,
  withdrawCommissionRequest,
  getWithdrawalHistory,
  getAccountDetails,
  initiateAddMoneyToWallet,
  getCreatedPartners,
  authController,
  getCouponPrice,
  getAllPartnersCreatedByUser,
  requestForApproval,
  fetchUserRolePrice,
  fetchTransactionId,
} = require("../controllers/UserCtrl");
const userAuthMiddleware = require("../middlewares/userAuthMiddleware");
const router = express.Router();

router.post("/login", login);
router.post("/createUser", createUser); // Every user can create a user except Retailer

// Change the price of a coupon
router.post("/changeCouponPrice", changeCouponPrice); // Every user can change coupon price except Retailer

// Get user's commission
router.get("/getUserCommission/:userId", getUserCommission);

// Set account details
router.post("/setAccountDetails", setAccountDetails); // can set multiple accounts

// Get account details
router.post("/getAccountDetails", getAccountDetails); // can set multiple accounts

// Request for withdrawal || Admin can approve or reject
router.post("/requestForWithdrawal", withdrawCommissionRequest); // can request for withdrawal

// Get withdrawal history
router.get("/getWithdrawalHistory/:userId", getWithdrawalHistory); // can request for withdrawal

// Initiate Add Money to wallet || Admin can approve or reject
router.post("/addMoneyToWallet", initiateAddMoneyToWallet); // can request for withdrawal

// Get coupon price
router.post("/getCouponPrice", getCouponPrice);

// Request for approval
router.post("/requestForApproval", requestForApproval);

// Fetch user role price
router.get("/fetchUserRolePrice",fetchUserRolePrice)

// Fetch transaction id
router.post('/fetchTransactionId',fetchTransactionId)

//Auth || POST
// router.post("/getUserData", authMiddleware, authController);
router.post("/getUserData", userAuthMiddleware, authController);

router.post("/getCreatedPartners", getCreatedPartners);


router.post("/getAllPartnersCreatedByUser", getAllPartnersCreatedByUser);

module.exports = router;
