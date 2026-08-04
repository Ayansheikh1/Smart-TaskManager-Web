import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {


        const navigate = useNavigate();
       const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");

        const{loading,login} = useAuth();


        const handleSubmit = async(e) =>{
            e.preventDefault();
            await login({email,password})
            navigate('/');

            
        }


        if(loading){
                return(
                    
        
                    <h1>
                        Loading.......
                    </h1>
                )
            }



  return (
    <main  >
        <div className="container" class="flex g " >
    <div className="left" >
            <div className="form-container">
              <h1>Welcome back!</h1>  
              <p>Simplify your work flow and boost your productivity with <span>Taskzee.</span>Get Started. </p> 
            <form onSubmit={handleSubmit} >
            <div className="input-groups">
                <label htmlFor="email">Email</label>
                <input 
                onChange={(e)=>{setEmail(e.target.value)}}
                type="email" name='email' id='email' placeholder='Enter email' />
            </div>
            <div className="input-groups">
                <label htmlFor="password">Password</label>
                <input 
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password" name='password' id='password' placeholder='Enter password' />
            </div>




            

            <button className='button'>Login</button>

            </form>

        </div>

    </div>
        <div className="right">
                Right part
        </div>
        </div>
    
    </main>
  )
}

export default Login
