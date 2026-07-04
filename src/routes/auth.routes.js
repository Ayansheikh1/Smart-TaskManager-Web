const express = require('express');
const authController = require('../controller/auth.controller')

const authRouter = express.Router();

/**
 * @routes POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register",authController.registerUserController)

module.exports = authRouter;