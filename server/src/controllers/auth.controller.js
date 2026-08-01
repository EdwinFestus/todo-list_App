const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateToken");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  const token = generateToken(user._id);

  const userResponse = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: userResponse,
        token,
      },
      "User registered successfully"
    )
  );
});

const login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(req.body);

  const token = generateToken(user._id);

  const userResponse = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: userResponse,
        token,
      },
      "Login successful"
    )
  );
});

module.exports = {
  register,
  login,
};