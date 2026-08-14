import {  createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
   const [tasks, setTasks] = useState([]);
   const [loading,setLoading] =useState(false);

   return(
    <TaskContext.Provider value={{tasks,setTasks,loading,setLoading}}>
        {children}
    </TaskContext.Provider>
   )
}
