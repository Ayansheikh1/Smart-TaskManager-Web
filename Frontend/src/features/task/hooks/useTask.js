import { useContext } from "react";
import { TaskContext } from "../context/task.context";
import { createTask, getAllTasks } from '../services/taskApi';





export const useTask = ()=>{
    const context = useContext(TaskContext);
    const{tasks,setTasks,loading,setLoading} = context;


    const create =async({title,description,status,priority,dueDate}) =>{
        setLoading(true);
        try{
            const data = await createTask({title,description,status,priority,dueDate});
            setTasks(data.task)
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
            setTasks(data.task)
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }




    return {create,getTasks}

}
