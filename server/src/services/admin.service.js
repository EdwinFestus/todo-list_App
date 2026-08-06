const User = require("../models/user.model");

const getAllUsers = async () => {
  return await User.find()
    .select("-password -refreshTokens -__v")
    .sort({ createdAt: -1 });
};

module.exports = {
  getAllUsers,
};