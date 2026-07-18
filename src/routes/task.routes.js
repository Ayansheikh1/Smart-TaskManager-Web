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

/**
 * @routes POST /api/task/tasks
 * @description read all tasks
 * @access Private
 */

taskRouter.post('/tasks',authMiddleware.authUser,taskController.getTaskscontroller);


module.exports = taskRouter;