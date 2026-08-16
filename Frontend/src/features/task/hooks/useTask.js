import { useContext } from "react";
import { TaskContext } from "../context/task.context";
import { createTask, getAllTasks, getTaskById } from '../services/taskApi';
import { useParams } from "react-router";





export const useTask = ()=>{
    const context = useContext(TaskContext);
    const{tasks,setTasks,loading,setLoading} = context;
    const {taskId} = useParams()


    const create =async({title,description,status,priority,dueDate}) =>{
        setLoading(true);
        try{
            const data = await createTask({title,description,status,priority,dueDate});
            setTasks(data.tasks)
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
            setTasks(data.tasks)
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }




    return {create,getTasks,tasks,viewTask}

}
