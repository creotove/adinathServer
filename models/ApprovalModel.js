const mongoose = require("mongoose");
const ApprovalSchema = new mongoose.Schema({
  userId: { type: "String", ref: "User" },
  role: {
    type: String,
    enum: ["Admin", "Master Distributor", "Distributor", "Retailer"],
    required: true,
  },
  name: {
    type: String,
    ref: "newUser",
  },
  uniqueId: {
    type: String,
    ref: "newUser",
  },
  transactionId: {
    type: String,
    default: "",
  },
  rolePrice: {
    type: Number,
    ref: "RolePrice",
  },
  paid: {
    type: Boolean,
    default: false,
  },
});
const ApprovalModel = mongoose.model("Request for Approval", ApprovalSchema);
module.exports = ApprovalModel;
