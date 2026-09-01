const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');


const aiRouter = express.Router();

/**
 * @routes POST /api/ai/generate-tasks
 * @description Generate tasks based on user input
 * @access Private  
 
 */

aiRouter.post("/")




module.exports = aiRouter