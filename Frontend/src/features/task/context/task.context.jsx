import {  createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
   const [tasks, setTasks] = useState([]);
   const[task,setTask]=useState('');
   const[totalTask,setTotalTask] = useState(0);
   const [loading,setLoading] =useState(false);

   return(
    <TaskContext.Provider value={{tasks,setTasks,task,setTask,loading,setLoading,setTotalTask,totalTask}}>
        {children}
    </TaskContext.Provider>
   )
}
