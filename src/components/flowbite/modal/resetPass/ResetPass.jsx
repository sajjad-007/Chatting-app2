import React from 'react'
import 'flowbite';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { ToastContainer } from 'react-toastify';
import { SuccessTost,ErrorTost } from '../../../utilities/toastify/tostify';

const ResetPass = () => {
    const auth = getAuth();

    const formik = useFormik({
        initialValues: {
          email: '',
        },
        onSubmit: (values,action) => {
            sendPasswordResetEmail(auth, values.email)
            .then(() => {
                // 
                SuccessTost("Password reset email sent!");
                // ..
            })
            .catch((error) => {
                ErrorTost(error);
                
                // ..
            });
          action.resetForm()
        },
      });
  return (
    <div>
      <ToastContainer /> 

        {/* <!-- Modal toggle --> */}
        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 capitalize" type="button">
        forget password?
        </button>

        {/* <!-- Main modal --> */}
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Reset your password
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    type="email" 
                                    name="email" 
                                    id="#email" 
                                    placeholder="name@company.com"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered? <Link to='/signup' className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
        
    </div>
  )
}

export default ResetPass