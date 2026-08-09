
const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            defualt: "",
        },
        completed: {
            type: Boolean,
            default: false,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }, {
        timestamps: true
    }
)

taskSchema.index({
  user: 1,
  completed: 1,
});

taskSchema.index({
  title: "text",
  description: "text",
});


taskSchema.set("toJSON", {
  versionKey: false,
  transform: function (doc, ret) {
    return ret;
  },
});

module.exports = mongoose.model("Task", taskSchema);