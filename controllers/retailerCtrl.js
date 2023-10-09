const CouponPurchased = require("../models/couponPurchased");
const newUserModel = require("../models/newUserModel");



const initiateCouponPurchase = async (req, res) => {
    try {
        const { userId, singleCouponPrice, quantity, transactionId } = req.body;

        // Find the user who is purchasing the coupon
        const user = await newUserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate total coupon price
        const totalCouponPrice = singleCouponPrice * quantity;

        // Check if user has enough balance to purchase the coupon
        if (user.walletBalance < totalCouponPrice) {
            return res.status(404).send({
                 error: 'Insufficient wallet balance',
                 success: false,
                });
        }

        // Create a new CouponPurchased entry to store the purchase details as pending
        const couponPurchased = new CouponPurchased({
            retailerId: userId,
            quantity,
            totalPrice: totalCouponPrice,
            transactionId,
            status: 'pending', // You can define statuses like 'pending', 'approved', 'rejected'
        });
        await couponPurchased.save();

        res.status(200).send({
             message: 'Coupon purchase request initiated',
                success: true,
                data: couponPurchased,
            });
    } catch (error) {
        console.error(error);
        res.status(500).send({
             error: 'Internal Server Error',
             success: false,
            });
    }
};

module.exports = {
    initiateCouponPurchase,
}
