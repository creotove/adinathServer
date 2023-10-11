const CouponPurchased = require("../models/couponPurchased");
const newUserModel = require("../models/newUserModel");

const getAllMasterAdmins = async (req, res) => {
    const masterAdmins = await newUserModel.find({ role: "Master Admin" });
    if (!masterAdmins) {
        return res.status(404).send({
            success: false,
            message: "Master Admins not found"
        })
    }
    return res.status(200).send({
        success: true,
        message: "Master Admins fetched successfully",
        data: masterAdmins
    })
}
const getAllAdmins = async (req, res) => {
    const admins = await newUserModel.find({ role: "Admin" });
    if (!admins) {
        return res.status(404).send({
            success: false,
            message: "Master Admins not found"
        })
    }
    return res.status(200).send({
        success: true,
        message: "Master Admins fetched successfully",
        data: admins
    })
}
const getAllMasterDistributor = async (req, res) => {
    const masterDistribution = await newUserModel.find({ role: "Master Distributor" });
    if (!masterDistribution) {
        return res.status(404).send({
            success: false,
            message: "Master Distribution not found"
        })
    }
    return res.status(200).send({
        success: true,
        message: "Master Distribution fetched successfully",
        data: masterDistribution
    })
}
const getAllDistributor = async (req, res) => {
    const distributor = await newUserModel.find({ role: "Distributor" });
    if (!distributor) {
        return res.status(404).send({
            success: false,
            message: "Distribution not found"
        })
    }
    return res.status(200).send({
        success: true,
        message: "Distribution fetched successfully",
        data: distributor
    })
}
const getAllRetailer = async (req, res) => {
    const retailer = await newUserModel.find({ role: "Retailer" });
    if (!retailer) {
        return res.status(404).send({
            success: false,
            message: "Retailer not found"
        })
    }
    return res.status(200).send({
        success: true,
        message: "Retailer fetched successfully",
        data: retailer
    })
}
const searchUser = async (req, res) => {
    try {
        const { query } = req.query;

        // Search for a user by ID, mobile number, or email
        const user = await newUserModel.findOne({
            $or: [
                { _id: query },
                { mobile: query },
                { email: query },
            ],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getUserFromQuery = async (req, res) => {
    try {
        const { name } = req.query;

        // Search for users with the same name
        const usersWithSameName = await newUserModel.find({ name });

        if (!usersWithSameName || usersWithSameName.length === 0) {
            return res.status(404).json({ error: 'No users with the same name found' });
        }

        res.status(200).json({ users: usersWithSameName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAllUsers = async (req,res)=>{
    try {
        const allUsers = await newUserModel.find();
    if(!allUsers)
    {
        return res.status(404).send({
            success : false,
            error : `No Users Found`
        })
    }
    return res.status(200).send({
        success : true,
        data : allUsers
    })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : "Something Went Wrong",
            error : `${error}`
        })
        
    }
    
}
module.exports = {
    getAllMasterAdmins,
    getAllAdmins,
    getAllMasterDistributor,
    getAllDistributor,
    getAllRetailer,
    searchUser,
    getUserFromQuery,
    getAllUsers,
}