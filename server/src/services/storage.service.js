const fs = require("fs/promises");
const path = require("path");
const ApiError = require("../utils/ApiError");

const deleteFile = async (fileUrl) => {
  if (!fileUrl) {
    return;
  }

  const relativePath = fileUrl.replace(/^\/+/, "");

  const filePath = path.join(
    process.cwd(),
    relativePath
  );

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      return;
    }

    throw new ApiError(
      500,
      "Failed to delete file"
    );
  }
};

const getPublicUrl = (filePath) => {
  const relativePath = path.relative(
    process.cwd(),
    filePath
  );

  return `/${relativePath.replace(/\\/g, "/")}`;
};

module.exports = {
  deleteFile,
  getPublicUrl,
};