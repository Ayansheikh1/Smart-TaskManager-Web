import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router';

const Register = () => {


    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {loading,register} = useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await register({username,email,password});
        navigate('/')
    }

    if(loading){
                return(
                    
        
                    <h1>
                        Loading.......
                    </h1>
                )
            }


  return (
   <main>
  <div className="form-container">
    <h1>Register</h1>
  <form onSubmit={handleSubmit}>
    <div className="input-group">
        <label htmlFor="username">Username</label>
        <input 
        onChange={(e)=>{setUsername(e.target.value)}}
        type='text' name='username' id='username' placeholder='Enter username'/>
    </div>
    <div className="input-group">
        <label htmlFor="email">Email</label>
        <input 
        onChange={(e)=>{setEmail(e.target.value)}}
        type='email' name='email' id='email' placeholder='Enter email'/>
    </div>
    <div className="input-group">
        <label htmlFor="username">Password</label>
        <input 
        onChange={(e)=>{setPassword(e.target.value)}}
        type='password' name='password' id='password' placeholder='Enter password'/>
    </div>

    <button className='button'>Register</button>
  </form>

  </div>
   </main>
  )
}

export default Register
