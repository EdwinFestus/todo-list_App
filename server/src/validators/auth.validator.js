const validateRegister = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  next();
};

module.exports = {
  validateRegister,
};