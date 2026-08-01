const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser")

const taskRoutes = require("./routes/task.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth.routes");



const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


app.use(notFound);
app.use(errorHandler);

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running"
    })
});

module.exports = app

