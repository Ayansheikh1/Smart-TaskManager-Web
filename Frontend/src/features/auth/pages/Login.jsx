import React from 'react'

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <form action="">
            <div className="input-groups">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='email' placeholder='Enter email' />
            </div>
            <div className="input-groups">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' placeholder='Enter password' />
            </div>

            <button className='button'>Login</button>

            </form>

        </div>
    </main>
  )
}

export default Login
