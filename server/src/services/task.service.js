const Task = require("../models/task.model");

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const getAllTasks = async (userId) => {
  return await Task.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

const getTaskById = async (id, userId) => {
  return await Task.findOne({
    _id: id,
    user: userId,
  });
};

const updateTask = async (id, userId, data) => {
  return await Task.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteTask = async (id, userId) => {
  return await Task.findOneAndDelete({
    _id: id,
    user: userId,
  });
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