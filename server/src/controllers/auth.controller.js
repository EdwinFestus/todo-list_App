const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateAccessToken");
const authService = require("../services/auth.service");


const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const result = await authService.refreshAccessToken(
    refreshToken
  );

  const userResponse = {
    _id: result.user._id,
    firstName: result.user.firstName,
    lastName: result.user.lastName,
    email: result.user.email,
    role: result.user.role,
    avatar: result.user.avatar,
  };

  res
    .cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          accessToken: result.accessToken,
          user: userResponse,
        },
        "Token refreshed successfully"
      )
    );
});



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
  const result = await authService.loginUser(req.body);

  const userResponse = {
    _id: result.user._id,
    firstName: result.user.firstName,
    lastName: result.user.lastName,
    email: result.user.email,
    role: result.user.role,
    avatar: result.user.avatar,
  };

  return res
    .cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: userResponse,
          accessToken: result.accessToken,
        },
        "Login successful"
      )
    );
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user._id);

  const userResponse = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    createdAt: user.createdAt,
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      userResponse,
      "User profile retrieved successfully"
    )
  );
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(
    req.user._id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Profile updated successfully"
    )
  );
});

module.exports = {
  register,
  login,
  refresh,
  getMe,
  updateProfile 
};