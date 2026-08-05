const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const adminController = require("../controllers/admin.controller");

router.get(
  "/users",
  protect,
  authorize("admin"),
  adminController.getUsers
);

module.exports = router;