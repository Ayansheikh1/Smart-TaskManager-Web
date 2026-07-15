const express = require("express");

const taskRouter = express.Router();
const taskController = require('../controller/task.controller')
const authMiddleware = require('../middleware/auth.middleware')


/**
 * @routes POST /api/task/create
 * @description Create a new task
 * @access Private
 */
 
taskRouter.post('/create',authMiddleware.authUser,taskController.createTaskController);



module.exports = taskRouter;