import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Login from '../pages/auth/login/Login'
import { Outlet } from 'react-router-dom'


const PrivetRoute = () => {
    const UserData = useSelector((state) => state.logInUser.value)
    //log in page e UserData er value null thake userData i kono value thake na
  return UserData ? <Outlet/>  :  <Login/>
}

export default PrivetRoute