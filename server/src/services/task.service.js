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

  const pageNumber = Math.max(Number(page), 1);
  const pageSize = Math.max(Number(limit), 1);

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

  const allowedSortFields = [
    "title",
    "createdAt",
    "updatedAt",
    "completed",
  ];

  const sortField = allowedSortFields.includes(sort)
    ? sort
    : "createdAt";

  const sortOrder = order === "asc" ? 1 : -1;

  const skip = (pageNumber - 1) * pageSize;

  const [tasks, totalItems] = await Promise.all([
    Task.find(filter)
      .sort({
        [sortField]: sortOrder,
      })
      .skip(skip)
      .limit(pageSize),

    Task.countDocuments(filter),
  ]);

  return {
    tasks,

    pagination: {
      totalItems,

      totalPages: Math.ceil(
        totalItems / pageSize
      ),

      currentPage: pageNumber,

      pageSize,

      hasNextPage:
        skip + pageSize < totalItems,

      hasPreviousPage:
        pageNumber > 1,
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