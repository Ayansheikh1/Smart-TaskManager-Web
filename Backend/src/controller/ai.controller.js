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

            ...taskByAi,
            owner
        });

        res.status(201).json({
            message:"Task created successfully",
             task:{
            taskId:task._id,
            title:task.title
        }
        })

    }catch(error){
        console.log(error)
     
            return res.status(400).json({
        message:error.message
    })

    }
}
















module.exports = { generateTasksController }