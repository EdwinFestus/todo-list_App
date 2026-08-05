const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select([
        "firstName",
        "lastName",
        "email",
        "role",
        "avatar",
        "createdAt",
        "updatedAt",
    ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      users,
      "Users retrieved successfully"
    )
  );
});

module.exports = {
  getUsers,
};