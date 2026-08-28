import { createContext, useState } from "react";

export const ToastContext = createContext()

export const ToastProvider = ({children})=>{
    const[toast,setToast] = useState("");

    function showToast(message,type){
        if(message && type){
            setToast({message,type})
        }
    }


    return(
        <ToastContext.Provider value={{toast,showToast}}>
        
        {children}
        </ToastContext.Provider>
    )
}