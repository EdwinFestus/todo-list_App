const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const {
  validateCreateTask,
} = require("../validators/task.validator");


router.post("/", validateCreateTask, taskController.createTask);

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.patch("/:id", taskController.updateTask);

router.patch("/:id/toggle", taskController.toggleTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;