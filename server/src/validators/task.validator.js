   
   
   const validateCreateTask = (req, res, next) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
        success: false,
        message: "Title is required",
        });
    }

    if (title.trim().length < 3) {
        return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters",
        });
    }

    next();
    };

    module.exports = {
    validateCreateTask,
    };