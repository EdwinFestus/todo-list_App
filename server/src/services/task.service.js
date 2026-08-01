const Task = require("../models/task.model");

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

const getTaskById = async (id) => {
  return await Task.findById(id);
};

const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

const toggleTask = async (id) => {
  const task = await Task.findById(id);

  if (!task) return null;

  task.completed = !task.completed;

  await task.save();

  return task;
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
};