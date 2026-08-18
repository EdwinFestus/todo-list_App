const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  // Default status code
  let statusCode = err.statusCode || 500;

  // Multer errors
  if (err instanceof multer.MulterError) {
    statusCode = 400;

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(statusCode).json({
        success: false,
        statusCode,
        message: "Avatar must be smaller than 5 MB",
      });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(statusCode).json({
        success: false,
        statusCode,
        message:
          "Only JPG, JPEG, PNG and WebP images are allowed",
      });
    }

    return res.status(statusCode).json({
      success: false,
      statusCode,
      message: "File upload failed",
    });
  }

  // Normal application errors
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;