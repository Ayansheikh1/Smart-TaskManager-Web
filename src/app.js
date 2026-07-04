const express = require("express");
const authRouter = require('./routes/auth.routes')

const app = express();


app.use(express.json());//middleware


app.use("/api/auth",authRouter);


module.exports = app;