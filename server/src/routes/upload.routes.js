const express = require("express");

const router = express.Router();

const {
  uploadAvatar,
} = require("../middleware/upload.middleware");

const {
  protect,
} = require("../middleware/auth.middleware");

const uploadController = require("../controllers/upload.controller");

router.post(
  "/avatar",
  protect,
  uploadAvatar.single("avatar"),
  uploadController.uploadAvatar
);

module.exports = router;