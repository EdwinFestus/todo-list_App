const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");

const {
  validateCreateTask,
} = require("../validators/task.validator");


router.post(
  "/",
  protect,
  validateCreateTask,
  taskController.createTask
);

router.get(
  "/",
  protect,
  taskController.getAllTasks
);

router.get(
  "/:id",
  protect,
  taskController.getTaskById
);

router.patch(
  "/:id",
  protect,
  taskController.updateTask
);

router.patch(
  "/:id/toggle",
  protect,
  taskController.toggleTask
);

router.delete(
  "/:id",
  protect,
  taskController.deleteTask
);

module.exports = router;