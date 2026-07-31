import React from 'react'

const Register = () => {




  return (
   <main>
  <div className="form-container">
    <h1>Register</h1>
  <form>
    <div className="input-group">
        <label htmlFor="username">Username</label>
        <input type='text' name='username' id='username' placeholder='Enter username'/>
    </div>
    <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type='email' name='email' id='email' placeholder='Enter email'/>
    </div>
    <div className="input-group">
        <label htmlFor="username">Password</label>
        <input type='password' name='password' id='password' placeholder='Enter password'/>
    </div>

    <button className='button'>Register</button>
  </form>

  </div>
   </main>
  )
}

export default Register
