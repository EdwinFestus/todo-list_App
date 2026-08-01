const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

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

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};