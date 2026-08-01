const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("./asyncHandler");
const ApiError = require("../utils/ApiError");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (
    authHeader &&
    authHeader.startsWith("Bearer ")
  ) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(
      401,
      "Access denied. No token provided."
    );
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(
      401,
      "User not found."
    );
  }

  req.user = user;

  next();
});

module.exports = {
  protect,
};