const express = require('express');

const authRouter = express.Router();

authRouter.post("/register",(req,res)=>{
    res.send("register page")
})

module.exports = authRouter;