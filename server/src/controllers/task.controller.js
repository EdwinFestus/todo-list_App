const taskService = require("../services/task.service");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

/**
 * @desc Create a new task
 * @route POST /api/tasks
 */
const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask({
    ...req.body,
    user: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      task,
      "Task created successfully"
    )
  );
});

/**
 * @desc Get all tasks
 * @route GET /api/tasks
 */
const getAllTasks = asyncHandler(async (req, res) => {
  const result = await taskService.getAllTasks(
    req.user._id,
    req.query
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Tasks retrieved successfully"
    )
  );
});

/**
 * @desc Get single task
 * @route GET /api/tasks/:id
 */
const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(
    req.params.id,
    req.user._id
  );


  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        task,
        "Task retrieved successfully"
      )
    );
});

/**
 * @desc Update task
 * @route PATCH /api/tasks/:id
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.id,
    req.user._id,
    req.body
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        task,
        "Task updated successfully"
      )
    );
});

/**
 * @desc Delete task
 * @route DELETE /api/tasks/:id
 */
const deleteTask = asyncHandler(async (req, res) => {
  const task = await taskService.deleteTask(
    req.params.id,
    req.user._id
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Task deleted successfully"
      )
    );
});

/**
 * @desc Toggle task completion
 * @route PATCH /api/tasks/:id/toggle
 */
const toggleTask = asyncHandler(async (req, res) => {
  const task = await taskService.toggleTask(
    req.params.id,
    req.user._id
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        task,
        "Task status updated successfully"
      )
    );
});

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
};