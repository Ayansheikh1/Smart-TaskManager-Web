const express = require('express');
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const authRouter = express.Router();

/**
 * @routes POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register",authController.registerUserController);


/**
 * @routes POST /api/auth/login
 * @description Login existing user
 * @access Public
 */

authRouter.post("/login",authController.loginUserController);

/**
 * @routes POST /api/auth/logout
 * @description Logout existing user
 * @access Public
 */

    authRouter.post("/logout",authController.logoutUserController);


/**
 * @routes GET /api/auth/get-me
 * @description get current user details
 * @access Private
 */

    authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports = authRouter;