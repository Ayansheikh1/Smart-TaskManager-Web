const express = require("express");

const app = express();


app.use(express.json());//middleware


module.exports = app;