const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const storageService = require("./storage.service");

const uploadAvatar = async (userId, file) => {
  if (!file) {
    throw new ApiError(
      400,
      "Avatar file is required"
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const oldAvatar = user.avatar;

  const newAvatar =
    storageService.getPublicUrl(file.path);

  user.avatar = newAvatar;

  await user.save();

  if (oldAvatar) {
    await storageService.deleteFile(oldAvatar);
  }

  return user;
};

module.exports = {
  uploadAvatar,
};