import {createBrowserRouter} from 'react-router'
import Register from '../src/features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Home from './features/auth/pages/Home'


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
        element:<Home/>
    }
])