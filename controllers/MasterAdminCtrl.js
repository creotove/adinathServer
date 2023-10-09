const CouponPurchased = require("../models/couponPurchased");
const newUserModel = require("../models/newUserModel");

const approveUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user in the database and update the status to "approved"
        const user = await newUserModel.findByIdAndUpdate(userId, { status: 'approved' });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const rejectUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user in the database and update the status to "rejected"
        const user = await newUserModel.findByIdAndUpdate(userId, { status: 'rejected' });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User rejected successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const calculateCommission = async (userId, couponPrice, quantity) => {
    try {
        const user = await newUserModel.findById(userId);

        if (!user) {
            return 0;
        }

        // Calculate commission for the current user
        const commission = (user.couponPrice - user.actualPriceOfCoupon) * quantity;

        // Update the user's commission fields
        user.totalCommissionEarned += commission;
        user.currentCommission = user.commissionOfCreatedByUser;

        // Save the user's changes
        await user.save();

        // Check if createdBy user and commissionOfcreatedPartners are defined
        // if (user.createdBy && user.createdBy.commissionOfcreatedPartners) {
        //     user.createdBy.commissionOfcreatedPartners.push({ commission, user: userId });
        //     await user.createdBy.save();
        // }

        // Update the commissionEarned array with the commission record
        user.commissionEarned.push({ commission, user: userId });
        await user.save();

        // Recursively calculate commission for the user's creator
        if (user.createdBy) {
            await calculateCommission(user.createdBy, couponPrice, quantity);
        }

        return commission;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const purchaseCouponNew = async (req, res) => {
    try {
        const { userId, singleCouponPrice, quantity, totalCouponPrice } = req.body;

        // Find the user who is purchasing the coupon
        const user = await newUserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const couponPurchase = await CouponPurchased.findOne({ retailerId: userId });

        if (!couponPurchase) {
            return res.status(404).json({ error: 'Coupon purchase request not found' });
        }

        // Verify the transaction with the provided transactionId (you can implement your verification logic here)

        // If the transaction is verified, update the coupon purchase status to 'approved'
        couponPurchase.status = 'approved';
        await couponPurchase.save();

        // Calculate total commission based on the single coupon price and quantity
        const totalCommission = (singleCouponPrice - user.actualPriceOfCoupon) * quantity;

        // Update the user's couponPrice, currentCommission, totalCommissionEarned, and commissionOfCreatedByUser
        user.couponPrice = singleCouponPrice;
        user.commissionOfCreatedByUser += totalCommission;
        user.totalCommissionEarned += totalCommission;
        user.currentCommission = user.commissionOfCreatedByUser;
        await user.save();

        // Calculate and update commission hierarchy recursively
        await calculateCommission(userId, singleCouponPrice, quantity);

        res.status(200).json({ message: 'Coupon purchased successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const rejectCouponPurchase = async (req, res) => {
    try {
        const { purchaseId } = req.body;

        // Find the coupon purchase request
        const couponPurchase = await CouponPurchased.findById(purchaseId);

        if (!couponPurchase) {
            return res.status(404).json({ error: 'Coupon purchase request not found' });
        }

        // Update the coupon purchase status to 'rejected'
        couponPurchase.status = 'rejected';
        await couponPurchase.save();

        res.status(200).json({ message: 'Coupon purchase request rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {
    approveUser,
    rejectUser,
    purchaseCouponNew,
    rejectCouponPurchase
}