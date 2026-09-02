const taskModel = require('../models/task.model');
const { generateTasks } = require('../services/ai.service');



/**
 * @name generateTasksController
 * @description Generate tasks based on user input
 * @access private
 */
async function generateTasksController(req,res){
    try{

        const {goal} = req.body;
        const owner = req.user.id;

        const taskByAi = await generateTasks({goal})

        const task = await taskModel.create({
            ...taskByAi
        });

        res.status(201).json({
            message:"Task created successfully",
            task
        })

    }catch(error){


    }
}
















module.exports = { generateTasksController }