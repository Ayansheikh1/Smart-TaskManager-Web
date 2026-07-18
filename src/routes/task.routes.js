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
 * @routes GET /api/task/tasks
 * @description read all tasks
 * @access Private
 */

taskRouter.get('/tasks',authMiddleware.authUser,taskController.getTaskscontroller);

/**
 * @routes GET /api/task/tasks/:taskId
 * @description retreive specific task
 * @access Private
 */

taskRouter.get('/tasks/:id',authMiddleware.authUser,taskController.getTaskByIdcontroller);


module.exports = taskRouter;