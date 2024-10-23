import React from 'react'
import 'flowbite';
import { Link } from 'react-router-dom';



const Login = () => {
  return (
    <div className="p-[40px] flex justify-center items-center flex-col gap-5 bg-yellow-100 h-[300px] w-[400px] mx-auto mt-[100px]">
      <h2 className='h2_heading'>Login Page</h2>
     <form>
      <div className='flex flex-col gap-5 items-center justify-center'>
        <div>
            <input 
              className="input" 
              type="text" 
              placeholder='Enter your email' 
              id='email'
              name='email'
            />
            
        </div>
        <div>
          <input 
            className="input" 
            type="password" 
            placeholder='Enter your password ' 
            id='password'
            name='password'
          />
        </div>
      </div>
      <button load='btnLoad' type='submit' className="btn">
      </button>
     </form>
     <p>Don't have an account? <Link className='text-[#bf6297]' to='/signup'>Sign up</Link></p>
    </div>
  )
  
}

export default Login
