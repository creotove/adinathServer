// const JWT = require("jsonwebtoken");

const newUserModel = require("../models/newUserModel");

module.exports = async (req, res, next) => {
  try {
    const { uniqueId } = req.body;

    const pendingUser = await newUserModel.findOne({ uniqueId});


    if (pendingUser.status === "pending") {
      return res.status(200).send({
        message: "Your account is pending for approval",
        success: false,
      });
    }
    if (pendingUser.status === "rejected") {
      return res.status(200).send({
        message: "Sorry, your account is rejected",
        success: false,
      });
    }
    next();

    // const token = req.header('Authorization');
    // JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
    //   if (err) {
    //     return res.status(200).send({
    //       message: "Auth Fialed",
    //       success: false,
    //     });
    //   } else {
    //     uniqueId = decode.id;
    //     next();
    //   }
    // });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
