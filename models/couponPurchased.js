const mongoose = require('mongoose');

const couponPurchasedSchema = new mongoose.Schema({
  retailerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the retailer
  quantity: Number,
  totalPrice: Number,
  purchaseDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  transactionId: String, // To store the transaction ID once it's provided
});

const CouponPurchased = mongoose.model('CouponPurchased', couponPurchasedSchema);

module.exports = CouponPurchased;
