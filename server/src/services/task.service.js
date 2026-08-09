const Task = require("../models/task.model");

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const getAllTasks = async (userId, query) => {
  const {
    page = 1,
    limit = 10,
    search,
    completed,
    sort = "createdAt",
    order = "desc",
  } = query;

  const filter = {
    user: userId,
  };

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const sortOption = {
    [sort]: order === "asc" ? 1 : -1,
  };

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),

    Task.countDocuments(filter),
  ]);

  return {
    tasks,

    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      pageSize: Number(limit),
      hasNextPage: skip + Number(limit) < total,
      hasPreviousPage: Number(page) > 1,
    },
  };
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