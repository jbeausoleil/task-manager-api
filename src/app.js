const express = require("express");
require("./db/mongoose");
const taskRouter = require("./routers/task.js");
const userRouter = require("./routers/user.js");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
