import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

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
        <div className="container" class="flex justify-center items-center min-h-screen gap-4  " >
    <div className="left" >
            <div className="form-container" class="flex flex-col justify-center ">
              <h1 class="text-3xl font-bold text-center ">Welcome back!</h1>  
              <p class="text-gray-400 text-center text-sm " >Simplify your work flow and boost your productivity with <span class="text-black font-bold">Taskzee.</span>Get Started. </p> 
            <form onSubmit={handleSubmit} 
            class="mt-10 space-y-5" >
            <div className="input-groups">
                <label htmlFor="email"></label>
                <input 
                onChange={(e)=>{setEmail(e.target.value)}}
                type="email" name='email' id='email' placeholder='Email'
                class="w-full rounded-full border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900"
                />
            </div>
            <div className="input-groups">
                <label htmlFor="password"></label>
                <input 
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password" name='password' id='password' placeholder='Password'
                 class="w-full rounded-full border border-neutral-400 px-6 py-4 text-neutral-700 outline-none focus:border-neutral-900"
                />
            </div>






            <button className='button' 
             class="w-full rounded-full border bg-neutral-900 text-white font-medium hover:bg-neutral-800  py-4 mt-2 outline-none"
            >Login</button>

             <p class="text-center">Not a member? <Link to={'/register'} class="text-emerald-900" >Register</Link></p>

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
