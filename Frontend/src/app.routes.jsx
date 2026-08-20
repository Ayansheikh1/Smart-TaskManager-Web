import {createBrowserRouter} from 'react-router'
import Register from '../src/features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Home from './features/task/pages/Home'
import Protected from './features/auth/components/Protected'
import TaskDetail from './features/task/pages/TaskDetail'
import CreateTask from './features/task/pages/CreateTask'
import EditTask from './features/task/pages/EditTask'


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
    },
    {
        path:"/tasks/:taskId",
        element: <Protected> <TaskDetail/> </Protected> 
    },
    {
        path:"/tasks/create",
        element: <Protected> <CreateTask/> </Protected> 
    },
    {
        path:"/tasks/:taskId/edit",
        element: <Protected> <EditTask/> </Protected> 
    }
])