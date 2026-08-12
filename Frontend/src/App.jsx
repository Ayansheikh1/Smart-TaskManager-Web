import { AuthProvider } from "./features/auth/context/auth.context"
import { router } from "./app.routes.jsx"
import { RouterProvider } from "react-router"
import { TaskProvider } from "./features/task/context/task.context.jsx"



function App() {
 

  return (
    <TaskProvider>

   
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>

     </TaskProvider>
      
  )
}

export default App
