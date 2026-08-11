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
        <div className="container" class="flex flex-col-reverse lg:flex-row justify-center items-center min-h-screen gap-4  " >
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

             <p class="text-center">Not a member? <Link to={'/register'} class="text-[#A9CB98]" >Register</Link></p>

            </form>
 
        </div>

    </div>
        <div className=" lg:flex flex-col justify-center relative w-full max-w-lg px-10 bg-[#a9cb981d] rounded-3xl py-10 ">
          <svg viewBox="0 0 480 420" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            {/* decorative swirl */}
            <path d="M120 180 C160 60, 320 60, 360 180" stroke="#9FC98A" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="200" cy="80" r="7" fill="none" stroke="#9FC98A" strokeWidth="4" />
            <circle cx="280" cy="80" r="7" fill="none" stroke="#9FC98A" strokeWidth="4" />

            {/* legs (crossed, sitting) */}
            <path
              d="M160 300 Q170 340 230 345 Q260 348 300 335 Q340 320 340 300
                 Q300 340 260 335 Q220 330 200 300 Q180 275 160 300 Z"
              fill="white" stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
            />

            {/* feet */}
            <ellipse cx="175" cy="325" rx="16" ry="11" fill="white" stroke="#1a1a1a" strokeWidth="4" />
            <ellipse cx="325" cy="322" rx="16" ry="11" fill="white" stroke="#1a1a1a" strokeWidth="4" />

            {/* body/sweater */}
            <path
              d="M175 300 Q160 220 190 175 Q215 145 250 145 Q285 145 310 175
                 Q340 220 325 300 Q300 320 250 320 Q200 320 175 300 Z"
              fill="#A9CB98" stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
            />

            {/* heart on sweater */}
            <path
              d="M250 230 C244 220 228 222 228 238 C228 252 250 268 250 268
                 C250 268 272 252 272 238 C272 222 256 220 250 230 Z"
              fill="none" stroke="white" strokeWidth="4" strokeLinejoin="round"
            />

            {/* left arm raised */}
            <path d="M195 190 Q160 175 140 205 Q120 235 130 260" fill="none" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
            <path d="M198 188 Q168 178 150 205 Q133 232 140 258" fill="#A9CB98" stroke="none" />
            <circle cx="130" cy="260" r="15" fill="white" stroke="#1a1a1a" strokeWidth="4" />

            {/* right arm raised */}
            <path d="M305 190 Q340 175 360 205 Q380 235 370 260" fill="none" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
            <path d="M302 188 Q332 178 350 205 Q367 232 360 258" fill="#A9CB98" stroke="none" />
            <circle cx="370" cy="260" r="15" fill="white" stroke="#1a1a1a" strokeWidth="4" />

            {/* neck */}
            <rect x="235" y="140" width="30" height="20" fill="white" stroke="#1a1a1a" strokeWidth="4" />

            {/* head */}
            <path
              d="M212 100 Q212 60 250 58 Q288 60 288 100 Q288 135 250 138 Q212 135 212 100 Z"
              fill="white" stroke="#1a1a1a" strokeWidth="4" strokeLinejoin="round"
            />

            {/* hair */}
            <path
              d="M210 100 Q205 55 250 50 Q296 55 291 102
                 Q288 75 265 68 Q270 90 255 95
                 Q248 75 235 78 Q238 95 222 98
                 Q218 78 210 100 Z"
              fill="#1a1a1a"
            />
            <path d="M212 98 Q205 130 214 150 Q218 130 216 105 Z" fill="#1a1a1a" />
            <path d="M288 98 Q296 130 286 150 Q282 130 284 105 Z" fill="#1a1a1a" />

            {/* face: closed peaceful eyes + subtle smile */}
            <path d="M228 96 Q234 92 240 96" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M260 96 Q266 92 272 96" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="250" cy="104" r="1.5" fill="#1a1a1a" />
            <path d="M242 116 Q250 121 258 116" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>

          {/* Top-left avatar (male, laughing) */}
          <div className="absolute left-2 top-4 w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-[#A9CB98] flex items-center justify-center shadow-md ring-4 ring-white">
            <svg viewBox="0 0 64 64" className="w-12 h-12 xl:w-14 xl:h-14">
              <circle cx="32" cy="34" r="18" fill="white" stroke="#1a1a1a" strokeWidth="3" />
              <path d="M16 30 Q14 12 32 10 Q50 12 48 28 Q40 18 32 18 Q22 18 16 30Z" fill="#1a1a1a" />
              <path d="M32 8 L34 -2 L30 -2 Z" fill="#1a1a1a" transform="translate(0,4)" />
              <path d="M24 34 Q28 30 32 34" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M34 34 Q38 30 42 34" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="32" cy="44" rx="8" ry="6" fill="#1a1a1a" />
              <ellipse cx="32" cy="42" rx="6" ry="3" fill="white" />
            </svg>
          </div>

          {/* Right avatar (female, surprised) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-white flex items-center justify-center shadow-md ring-4 ring-[#F2F5EE] border border-neutral-200">
            <svg viewBox="0 0 64 64" className="w-12 h-12 xl:w-14 xl:h-14">
              <circle cx="32" cy="34" r="18" fill="white" stroke="#1a1a1a" strokeWidth="3" />
              <path d="M14 28 Q12 6 32 6 Q52 6 50 28 Q52 44 46 50 Q48 34 40 26 Q36 34 28 30 Q26 40 18 42 Q16 34 14 28Z" fill="#1a1a1a" />
              <circle cx="25" cy="33" r="2" fill="#1a1a1a" />
              <circle cx="39" cy="33" r="2" fill="#1a1a1a" />
              <ellipse cx="32" cy="44" rx="4" ry="5" fill="#1a1a1a" />
            </svg>
          </div>

          {/* Task card */}
          <div className="absolute left-4 bottom-10 bg-white rounded-3xl shadow-xl border border-neutral-100 p-5 w-48 xl:w-56">
            <p className="font-semibold text-neutral-900 text-lg">Learn React</p>
            <p className="text-neutral-400 text-sm mt-0.5">10 Task</p>

            <div className="flex items-center justify-between mt-6">
              <span className="text-sm font-medium text-neutral-800 bg-neutral-100 rounded-full px-4 py-2">Redux</span>

              <div className="relative w-12 h-12">
                <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#E7EDE2" strokeWidth="3.5" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none" stroke="#9FC98A" strokeWidth="3.5"
                    strokeDasharray="97.4" strokeDashoffset="15.6" strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-neutral-800">84%</span>
              </div>
            </div>
          </div>

          <p className="absolute top-6 left-1/2 -translate-x-1/2 text-center text-xl font-semibold text-neutral-900 px-8">
            Make your work easier and organised
          </p>
        </div>
        </div>
    
    </main>
  )
}

export default Login
