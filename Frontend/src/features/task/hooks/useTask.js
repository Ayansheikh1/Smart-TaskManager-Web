import { useContext } from "react";
import { TaskContext } from "../context/task.context";
import { createTask } from '../services/taskApi';





export const useTask = ()=>{
    const context = useContext(TaskContext);
    const{task,setTask,loading,setLoading} = context;


    const create =async({title,description,status,priority,dueDate}) =>{
        setLoading(true);
        try{
            const data = await createTask({title,description,status,priority,dueDate});
            setTask(data.task)
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }




    return {create}

}
