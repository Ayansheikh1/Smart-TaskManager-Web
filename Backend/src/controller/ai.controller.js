const taskModel = require('../models/task.model');



/**
 * @name generateTasksController
 * @description Generate tasks based on user input
 * @access private
 */
async function generateTasksController(req,res){
    try{
        const {goal} = req.body;
        const owner = req.user.id
    }catch(error){
        
    }
}
















module.exports = { generateTasksController }