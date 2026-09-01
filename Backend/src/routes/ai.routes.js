const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const aiController = require('../controller/ai.controller');


const aiRouter = express.Router();

/**
 * @routes POST /api/ai/generate-tasks
 * @description Generate tasks based on user input
 * @access Private  
 
 */

aiRouter.post("/generate-tasks",authMiddleware.authUser,aiController.generateTasksController);




module.exports = aiRouter