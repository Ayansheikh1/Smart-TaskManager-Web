import { useContext } from "react";
import { TaskContext } from "../context/task.context";
import { createTask, getAllTasks,getTaskById } from '../services/taskApi';





export const useTask = ()=>{
    const context = useContext(TaskContext);
    const{tasks,setTasks,task,setTask,loading,setLoading,setTotalTask,totalTask} = context;
    


    const create =async({title,description,status,priority,dueDate}) =>{
        setLoading(true);
        try{
            const data = await createTask({title,description,status,priority,dueDate});
            return data

        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const getTasks = async ()=>{
         setLoading(true);
        try{
            const data = await getAllTasks();
            setTasks(data.tasks)
            setTotalTask(data.totalTasks)
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const viewTask = async (taskId) =>{
        setLoading(true);
        try{
            const data = await getTaskById(taskId);
            setTask(data.task)
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }




    return {create,getTasks,tasks,task,viewTask,setLoading,loading,totalTask}

}
