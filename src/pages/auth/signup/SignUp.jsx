import React, { useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import Button from '../../../components/flowbite/button/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getDatabase, push, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
}from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SuccessTost,ErrorTost,InfoTost } from '../../../components/utilities/toastify/tostify';
import { PacmanLoader } from 'react-spinners';


const SignUp = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const emailregx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const [loading,setLoading] = useState(false)
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
        .min(3, 'Minimum 4 characters required')
        .required('Kindly enter your password'),
      email: Yup.string()
      .email('Invalid email address')
      .matches(emailregx, 'please check your regx')
      .required('Kindly enter your email'),
    }),
    onSubmit: (values,actions) => {
      // console.log(JSON.stringify(values, null, 2));
      // console.log(values);
      setLoading(true)
      createUserWithEmailAndPassword(auth, values.email, values.password, values.fullName)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: values.fullName,
          }).then(() => {
              console.log(user);
              set(ref(db, 'floks/' + user.uid), {
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                userId: user.uid,
              }).then(()=>{
                SuccessTost('sign up successfull',);
                actions.resetForm();
                setTimeout(() => {
                  navigate("/");
                }, 2000);
                setLoading(false)
              })
              
            }).catch((error) => {
              // An error occurred
              // ...
              ErrorTost("Can't create realtime data",)
              setLoading(false)
            });
            
        });
        // ...
      })
      .catch((error) => {
        ErrorTost('already in use this account',)
        console.log(error);
        setLoading(false)
        actions.resetForm()
        // ..
      });
      
      
    },
  });
  
  
  
  return (
    <>
      <ToastContainer /> 
      {loading 
        ?
      <div className='h-screen w-full bg-yellow-200 z-50 absolute flex items-center justify-center'>
        <PacmanLoader
          color="#33c7e1"
          size={40}
          speedMultiplier={1} 
        />
      </div>
        :
        <div className="p-[40px] flex justify-center items-center flex-col gap-5 relative z-10">
        
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
     
      }
      
    </>
  )
}

export default SignUp