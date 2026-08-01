const express = require("express");
const authRouter = require('./routes/auth.routes')
const taskRouter = require('./routes/task.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();


app.use(express.json());//middleware
app.use(cookieParser());
app.use(cors({
     origin:'http://localhost:5173',
    credentials:true
}))


app.use("/api/auth",authRouter);
app.use('/api/task',taskRouter);


module.exports = app;