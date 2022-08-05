const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

// ------Register User-----//
router.post("/register", authController.userRegister);

//------Login User---------//
router.post("/login", authController.userLoging);

//-----Forgot Password--------//
router.post("/forgot-password", authController.forgotPassword);

//-----reset Password--------//
router.post("/reset-password/:userId/:token", authController.resetPassword);

module.exports = router;
