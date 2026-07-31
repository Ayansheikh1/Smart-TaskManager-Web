import {createBrowserRouter} from 'react-router'
import Register from '../src/features/auth/pages/Register'


export const router = createBrowserRouter([
    {
        path:"/register",
        element:<Register/>

    },
    
])