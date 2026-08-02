import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Home = () => {

  const {logout,user} = useAuth();
  const handleLogout = async (e) =>{
    e.preventDefault();
    await logout();

  }

  return (
    <main>
        <h1>Welcome {user?.username}!</h1>
        <button onClick={handleLogout} >Logout</button>
        
    </main>
  )
}

export default Home
