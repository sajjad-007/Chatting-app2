import React from 'react'
import 'flowbite';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail   } from "firebase/auth";
import Button from '../../../components/flowbite/button/Button';
import { SuccessTost,ErrorTost,InfoTost } from '../../../components/utilities/toastify/tostify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ResetPass from '../../../components/flowbite/modal/resetPass/ResetPass';
import SignInGoogle from '../../../components/flowbite/signinGoogle/SignInGoogle';
import { useSelector, useDispatch } from 'react-redux'
import { authLogInUser } from '../../../redux/slice/authSlice';




const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const UserData = useSelector((state) => state.logInUser.value)
  
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    onSubmit: (values,actions) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          if (user.emailVerified) {
            SuccessTost("Login successfull")
            // console.log("Login successfull");
            localStorage.setItem("LoggedInUser", JSON.stringify(user));
            dispatch(authLogInUser(user))
            setTimeout(() => {
              navigate("/home");
            }, 2000);
            actions.resetForm()
          }else{
            InfoTost("Please first verify your email")
            // console.log("Please first verify your email");
          }
          
        })
        .catch((error) => {
          ErrorTost("Invalid Email or Password")
          // console.log("Invalid Email or Password");
          
        });
    },
  });
  let handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      console.log(auth);
      console.log(email);
      
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      
      // ..
    });   
  }
  
  return (
    <div className="p-[40px] flex justify-center items-center flex-col gap-5 bg-[#b6d7759b] h-[500px] w-[400px] mx-auto mt-[100px]">
      <ToastContainer /> 
      <h2 className='h2_heading'>Login Page</h2>
      {/* signIn with google firebase= signin-method  */}
      <SignInGoogle/>
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
     {/* Password reset  firebase= reset password using email  */}
     <ResetPass/>
    </div>
  )
  
}

export default Login
