const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const adminService = require("../services/admin.service");

const getUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getAllUsers();

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