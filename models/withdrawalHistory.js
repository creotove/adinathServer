const mongoose = require('mongoose');
const withdrawalHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    date: { type: Date, default: Date.now },
    bankName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
},
    {
        timestamps: true,
    }
);
const withdrawalHistory = mongoose.model('WithdrawalHistory', withdrawalHistorySchema);
module.exports = withdrawalHistory;