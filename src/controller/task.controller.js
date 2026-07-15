const taskModel = require('../models/task.model');
const userModel = require('../models/user.model');




/**
 * @name createTaskController
 * @description create a new task of login user
 * @access private
 */

async function createTaskController(req,res){
    try{
    const{title,description,status,priority,dueDate} = req.body;
    const owner = req.user.id;

   

    const task = await taskModel.create({
        title,
        description,
        status,
        priority,
        dueDate,
        owner
    })

    return res.status(201).json({
        message:"Task Created",
        task:{
            taskId:task._id,
            title:task.title
        }
    })
}catch(error){
    return res.status(400).json({
        message:error.message
    })

}
}



module.exports = {createTaskController}