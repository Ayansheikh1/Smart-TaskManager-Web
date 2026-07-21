const taskModel = require('../models/task.model');





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


/**
 * @name getTaskscontroller
 * @description Get ALL Tasks
 * @access private
 */
async function getTaskscontroller(req,res){
   try{ 
    const owner = req.user.id;
    const tasks = await taskModel.find({
        owner
    })
    
    return res.status(200).json({
        message:"Tasks fetch successfully",
        totalTasks:tasks.length,
        tasks:tasks

    })



   }catch(error){
    return res.status(500).json({
        message:error.message
   })
}
}


/**
 * @name getTaskByIdcontroller
 * @description Get single task by Id
 * @access private
 */

async function getTaskByIdcontroller(req,res){
    try{
    const owner = req.user.id;
    const taskId =req.params.id;

    const task = await taskModel.findOne({
        _id:taskId,
        owner
    })
    if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message:"task fetched!",
            task
        })

    }catch(error){
         return res.status(500).json({ message: error.message });
    }
}


/**
 * @name updateTaskController
 * @description modify task
 * @access private
 */
async function updateTaskController(req,res){
    try{
    const owner = req.user.id;
    const taskId = req.params.id;
   const{title,description,status,priority,dueDate} = req.body;
    const task = await taskModel.findOneAndUpdate({
        owner,
        _id:taskId
    },
{
    title,
    description,
    status,
    priority,
    dueDate
},{
    new:true,
    runValidators:true
})
    if(!task){
        return res.status(404).json({
            message:"task not found!"
        })
    }
    return res.status(200).json({
        message:"task modify successfully!",
        task
    })

}catch(error){
    return res.status(500).json({
        message:error.message
    })
}

}






module.exports = {createTaskController,getTaskscontroller,getTaskByIdcontroller,updateTaskController}