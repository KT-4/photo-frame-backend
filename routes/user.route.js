const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");

//-------- Get User Profile ---------//
router.get("/profile", auth, userController.userProfile);

module.exports = router;
