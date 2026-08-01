const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const registerUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      409,
      "Email already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

module.exports = {
  registerUser,
};