import React from 'react'
import 'flowbite';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from '../../../components/flowbite/button/Button';




const Login = () => {
  const auth = getAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    onSubmit: values => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          
        });
    },
  });
  
  return (
    <div className="p-[40px] flex justify-center items-center flex-col gap-5 bg-yellow-400 h-[400px] w-[400px] mx-auto mt-[100px]">
      <h2 className='h2_heading'>Login Page</h2>
     <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-5 items-center justify-center'>
        <div>
            <input 
              className="input" 
              type="text" 
              placeholder='Enter your email' 
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            
        </div>
        <div>
          <input 
            className="input" 
            type="password" 
            placeholder='Enter your password ' 
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
      </div>
      <div>
        <Button  text='submit' />
      </div>
     </form>
     <p>Don't have an account? <Link className='text-[#bf6297]' to='/signup'>Sign up</Link></p>
    </div>
  )
  
}

export default Login
