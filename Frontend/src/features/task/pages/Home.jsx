import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useTask } from '../hooks/useTask';

const Home = () => {

  const {logout,user} = useAuth();
  const{tasks,getTasks} =useTask();
  const handleLogout = async (e) =>{
    
    await logout();

  }

  const handleGetTasks = async () =>{
    await getTasks();
  }




  return (
    <main>
        <h1>Welcome {user?.username}!</h1>
        <button onClick={handleLogout} >Logout</button>
        <button onClick={handleGetTasks}> tasks</button>

        
       <h2>Tasks</h2>
      {tasks.map((task) => (
    <div key={task._id}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.status}</p>
        <p>{task.priority}</p>
    </div>
))}



        
    </main>
  )
}

export default Home
