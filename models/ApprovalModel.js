const mongoose = require("mongoose");
const ApprovalSchema = new mongoose.Schema({
  userId: { type: "String", ref: "User" },
  role: {
    type: String,
    enum: ["Admin", "Master Distributor", "Distributor", "Retailer"],
    default: "user",
  },
  transactionId: {
    type: String,
    default: "",
  },
  rolePrice: {
    type: Number,
    ref: "RolePrice",
  },
});
const ApprovalModel = mongoose.model("Request for Approval", ApprovalSchema);
module.exports = ApprovalModel;
