import {  createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children})=>{
   const [task, setTask] = useState([]);
   const [loading,setLoading] =useState(false);

   return(
    <TaskContext.Provider value={{task,setTask,loading,setLoading}}>
        {children}
    </TaskContext.Provider>
   )
}
