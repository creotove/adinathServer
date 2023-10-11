const mongoose = require('mongoose');
const RolePriceSchema = new mongoose.Schema({
    masterAdmin: {
        type: Number,
        default: 5000
    },
    admin: {
        type: Number,
        default: 2999
    },
    masterDistributor: {
        type: Number,
        default: 499
    },
    distributor: {
        type: Number,
        default: 99
    },
    retailer: {
        type: Number,
        default: 21
    },
});
const RolePriceModel = mongoose.model('Role Price', RolePriceSchema);
module.exports = RolePriceModel;


