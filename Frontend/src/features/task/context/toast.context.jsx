import { createContext, useState } from "react";
import Toast from '../components/Toast'


export const ToastContext = createContext()

export const ToastProvider = ({children})=>{
    const[toast,setToast] = useState(null);

    function showToast(message,type){
        if(message && type){
            setToast({message,type})
           
        }
        console.log(message, type)
    }




    return(
        <ToastContext.Provider value={{toast,showToast}}>
        <Toast />
        {children}
        
        </ToastContext.Provider>
    )
}