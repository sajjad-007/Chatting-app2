import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Login from '../pages/auth/login/Login'
import { Outlet } from 'react-router-dom'


const PrivetRoute = () => {
    const UserData = useSelector((state) => state.logInUser.value)
  return UserData ? <Login/> : <Outlet/> 
}

export default PrivetRoute