import {createBrowserRouter} from 'react-router'
import Register from '../src/features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Home from './features/task/pages/Home'
import Protected from './features/auth/components/Protected'


export const router = createBrowserRouter([
    {
        path:"/register",
        element:<Register/>

    },
     {
        path:"/login",
        element:<Login/>

    },
    {
        path:"/",
        element: <Protected> <Home/> </Protected> 
    }
])