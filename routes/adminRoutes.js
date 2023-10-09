const express = require("express");
const {
    getAllMasterAdmins,
    getAllAdmins,
    getAllMasterDistributor,
    getAllDistributor,
    getAllRetailer,
    searchUser,
    getUserFromQuery,
    getAllUsers
} = require("../controllers/AdminCtrl");
const router = express.Router();

// All User fetching 
router.get("/masterAdmin", getAllMasterAdmins);
router.get("/admin", getAllAdmins);
router.get("/masterDistributor", getAllMasterDistributor);
router.get("/distributor", getAllDistributor);
router.get("/retailer", getAllRetailer);
router.get('/allUser',getAllUsers)


router.get('/search', searchUser); // User based on id fetching
router.get("/getUserFromQuery", getUserFromQuery) // User based on name fetching







module.exports = router;


