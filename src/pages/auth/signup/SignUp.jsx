import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/flowbite/button/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  const [passShow,setPassShow] = useState(true)
  const emailregx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      password:'',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(2, 'Minimum 2 characters required')
        .required('Kindly enter your full name'),
      password: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .min(4, 'Minimum 5 characters required')
        .required('Kindly enter your password'),
      email: Yup.string()
      .email('Invalid email address')
      .matches(emailregx , 'please check your regx')
      .required('Kindly enter your email'),
    }),
    onSubmit: values => {
      // console.log(JSON.stringify(values, null, 2));
      console.log(values);
      
      
    },
  });
  
  
  
  return (
    <div className="p-[40px] flex justify-center items-center flex-col gap-5 relative">
    <h2 className='text-xl text-green-400'>Sign up Page</h2>
     <form onSubmit={formik.handleSubmit}>
      <div className='flex flex-col gap-5'>
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
          {formik.errors.email && formik.touched.email ? (
            <p className='text-red-700 mt-1'>{formik.errors.email}</p>
          ) : null}
        </div>
        <div>
          <input 
            className="input" 
            type="text" 
            placeholder='Enter your full Name' 
            id='fullName'
            name='fullName'
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName && formik.touched.fullName ? (
            <p className='text-red-700 mt-1'>{formik.errors.fullName}</p>
          ) : null}
        </div>
        <div className='relative'>
          <input 
            className="input" 
            type='password'
            placeholder='Enter your password ' 
            id='password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
              <p className='text-red-700 mt-1'>{formik.errors.password}</p>
            ) : null}
        </div>
      </div>
      <div>
        <Button  text='submit' />
      </div>
     </form>
     <p>Don't have an account? <Link className='text-[#bf6297]' to='/'>Sign In</Link></p>
    </div>
  )
}

export default SignUp