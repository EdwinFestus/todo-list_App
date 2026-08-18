const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const uploadService = require("../services/upload.service");

const uploadAvatar = asyncHandler(async (req, res) => {

    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

  const user = await uploadService.uploadAvatar(
    req.user._id,
    req.file
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "Avatar uploaded successfully"
    )
  );
});

module.exports = {
  uploadAvatar,
};