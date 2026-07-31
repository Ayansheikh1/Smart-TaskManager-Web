import { AuthProvider } from "./features/auth/context/auth.context"
import { router } from "./app.routes.jsx"
import { RouterProvider } from "react-router"



function App() {
 

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
      
  )
}

export default App
