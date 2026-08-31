import { useContext } from "react";
import { TaskContext } from "../context/task.context";
import { createTask, deleteTask, getAllTasks,getTaskById, updateTask } from '../services/taskApi';





export const useTask = ()=>{
    const context = useContext(TaskContext);
    const{tasks,setTasks,task,setTask,loading,setLoading,setTotalTask,totalTask,error,setError} = context;
    


    const create =async({title,description,status,priority,dueDate}) =>{
        setLoading(true);
        setError(null);
        
        try{
            const data = await createTask({title,description,status,priority,dueDate});
            return data

        } catch(error){
            setError(
                error.response?.data?.message || "Failed to create tasks"
            )
             throw error
        }finally{
            setLoading(false)
        }
    }

    const getTasks = async ()=>{
         setLoading(true);
         setError(null);
        try{
            const data = await getAllTasks();
            setTasks(data.tasks)
            setTotalTask(data.totalTasks)
            return data
        } catch(error){
            setError(
                error.response?.data?.message || "Failed to fetch tasks"
            )
             throw error
        }finally{
            setLoading(false)
        }
    }

    const viewTask = async (taskId) =>{
        setLoading(true);
        setError(null);
        try{
            const data = await getTaskById(taskId);
            setTask(data.task)
        } catch(error){
            setError(
                error.response?.data?.message || "Failed to fetch task"
            )
             throw error
        }finally{
            setLoading(false)
        }
    }

    const update = async(taskId,{title,description,status,priority,dueDate}) =>{
        setLoading(true);
        setError(null);
        try{
            const data = await updateTask(taskId,{
                title,
                description,
                status,
                priority,
                dueDate
            });
            
            return data
        }catch(error){
            setError(
                error.response?.data?.message || "Failed to update task"
        
            )
            throw error
        }finally{
            setLoading(false)
        }
    }

    const removeTask = async(taskId)=>{
        setLoading(true);
        setError(null);
        try{
                await deleteTask(taskId)
        }catch(error){
            setError(
                error.response?.data?.message || "Failed to delete task"
            )
             throw error
        }finally{
            setLoading(false)
        }
    }




    return {create,getTasks,tasks,task,viewTask,loading,totalTask,update,removeTask,error}

}
