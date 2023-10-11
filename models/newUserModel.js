const mongoose = require("mongoose");
const newuserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    actualPriceOfCoupon: {
        type: Number,
        default: 100,
    },
    state:{
        type: String,
        required: true,
    },
    city :{
        type: String,
        required: true,
    },
    pinCode:{
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ["Master Distributor", "Distributor", "Retailer", "Admin", "Master Admin"],
        required: true,
    },
    partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: String , ref: 'User' },
    commissionOfCreatedByUser: { //jisne create kiya uska commissions
        type: Number,
        default: 0,
    },
    couponPrice: {
        type: Number,
        default: 0,
    },
    panCard: {
        type: String,
        required: true,
    },
    uniqueId: {
        type: String,
        default: null,
    },
    currentCommission: {
        type: Number,
        default: 0,
    },
    totalCommissionEarned: {
        type: Number,
        default: 0,
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
    commissionEarned: [
        {
            commission: {
                type: Number,
                default: 0,
            },
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

}, { timestamps: true });
const newUserModel = mongoose.model("newUser", newuserSchema);
module.exports = newUserModel;

    // commissionOfcreatedPartners: [{ //User jo create karega uska commission
    //     commission: {
    //         type: Number,
    //         default: 0,
    //     },
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // }],



/*
{
    "name": "Master Admin Name",
  "email": "masteradmin@example.com",
  "password": "password",
  "role": "Master Admin",
  "createdBy": "N/A",
  "couponPrice": 100,
  "actualPriceOfCoupon": 98,
  "commissionOfCreatedByUser": 2
}
    * /
/*
Master Admin
{
    "name": "Master Admin Name",
    "email": "masteradmin@example.com",
    "password": "password",
    "role": "Master Admin",
}

Admin
{
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "password",
    "role": "Admin",
    "createdBy": "6516e0cb69298c54322ef228"
}
Master Distributor
{
  "name": "Master Distributor Name",
  "email": "masterdistributor@example.com",
  "password": "password",
  "role": "Master Distributor",
  "createdBy": "6516e333945ae71409780901"
}

Distributor
{
    "name": "Distributor Name",
    "email": "distributor@example.com",
    "password": "password",
    "role": "Distributor",
    "createdBy": "6516e2dc36a4cad969a11684"
}

Retailer
{
  "name": "Retailer Name",
  "email": "retailer@example.com",
  "password": "password",
  "role": "Retailer",
  "createdBy": "6516c902e5f183867f454c63"
}
*/

// {
//     "_id": {
//       "$oid": "6516c4ef9bb27e65420dedf9"
//     },
//     "name": "Master Admin Name",
//     "email": "masteradmin@example.com",
//     "password": "password",
//     "role": "Master Admin",
//     "createdBy": "N/A",
//     "couponPrice": 100,
//     "actualPriceOfCoupon": 98,
//     "commissionOfCreatedByUser": 2,
//     "commissionOfcreatedPartners": [
//       {
//         "commission": 2,
//         "_id": {
//           "$oid": "6516c5a4d36729320feade27"
//         }
//       }
//     ],
//     "partners": [
//       {
//         "$oid": "6516c5a4d36729320feade26"
//       }
//     ],
//     "updatedAt": {
//       "$date": "2023-09-29T12:40:04.098Z"
//     }
//   }