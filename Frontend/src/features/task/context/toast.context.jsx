import { createContext, useRef, useState } from "react";
import Toast from '../components/Toast'


export const ToastContext = createContext()

export const ToastProvider = ({children})=>{
    const[toast,setToast] = useState(null);
    const timerId = useRef(null)

    function showToast(message,type){
        if(message && type){
            setToast({message,type})
           
        }

        if(timerId.current){
            clearTimeout(timerId.current);
            timerId.current = null
        }
        

       timerId.current = setTimeout(()=>{

            setToast(null)
        },3000)


        
        
            
        
        
        
    }




    return(
        <ToastContext.Provider value={{toast,showToast}}>
        <Toast />
        {children}
        
        </ToastContext.Provider>
    )
}