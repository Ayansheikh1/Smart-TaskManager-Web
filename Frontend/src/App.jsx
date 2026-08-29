import { AuthProvider } from "./features/auth/context/auth.context"
import { router } from "./app.routes.jsx"
import { RouterProvider } from "react-router"
import { TaskProvider } from "./features/task/context/task.context.jsx"
import { ToastProvider } from "./features/task/context/toast.context.jsx"



function App() {
 

  return (
    <ToastProvider>
    <TaskProvider>

   
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>

     </TaskProvider>

     </ToastProvider>
      
  )
}

export default App
