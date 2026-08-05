const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const ApiError = require("../utils/ApiError");

const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

/**
 * Register User
 */
const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

/**
 * Login User
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+-password -refreshTokens -__v");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id);

  const refreshToken = generateRefreshToken(user._id);

  user.refreshTokens.push({
    token: refreshToken,
  });

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh Access Token
 */
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(
      401,
      "Refresh token is required"
    );
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
  );

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const tokenExists = user.refreshTokens.find(
    (item) => item.token === refreshToken
  );

  if (!tokenExists) {
    throw new ApiError(
      401,
      "Invalid refresh token"
    );
  }

  const newAccessToken = generateAccessToken(
    user._id
  );

  const newRefreshToken = generateRefreshToken(
    user._id
  );

  user.refreshTokens = user.refreshTokens.filter(
    (item) => item.token !== refreshToken
  );

  user.refreshTokens.push({
    token: newRefreshToken,
  });

  await user.save();

  return {
    user,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};


const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateProfile = async (userId, data) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "avatar",
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  getCurrentUser, 
  updateProfile
};