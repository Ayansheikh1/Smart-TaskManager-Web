const express = require("express");
const authRouter = require('./routes/auth.routes')
const taskRouter = require('./routes/task.routes')
const cookieParser = require('cookie-parser')

const app = express();


app.use(express.json());//middleware
app.use(cookieParser());


app.use("/api/auth",authRouter);
app.use('/api/task',taskRouter);


module.exports = app;