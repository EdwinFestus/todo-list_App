const mongoose = require("mongoose");
const Task = require("../models/task.model");

const getDashboard = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const [overview] = await Task.aggregate([
    {
      $match: {
        user: userObjectId,
      },
    },
    {
      $facet: {
        statistics: [
          {
            $group: {
              _id: null,
              totalTasks: {
                $sum: 1,
              },
              completedTasks: {
                $sum: {
                  $cond: ["$completed", 1, 0],
                },
              },
              pendingTasks: {
                $sum: {
                  $cond: ["$completed", 0, 1],
                },
              },
            },
          },
        ],

        recentTasks: [
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $limit: 5,
          },
        ],
      },
    },
  ]);

  const stats = overview.statistics[0] || {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  };

  const completionRate =
    stats.totalTasks === 0
      ? 0
      : Number(
          (
            (stats.completedTasks / stats.totalTasks) *
            100
          ).toFixed(2)
        );

  return {
    overview: {
      ...stats,
      completionRate,
    },
    recentTasks: overview.recentTasks,
  };
};

module.exports = {
  getDashboard,
};