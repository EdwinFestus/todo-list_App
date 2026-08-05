const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const {
  validateRegister,
  validateLogin,
} = require("../validators/auth.validator");

router.post(
  "/register",
  validateRegister,
  authController.register
);

router.post(
  "/login",
  validateLogin,
  authController.login
);

router.get(
  "/me",
  protect,
  authController.getMe
);

router.patch(
  "/profile",
  protect,
  authController.updateProfile
);

router.post("/refresh", authController.refresh);

module.exports = router;