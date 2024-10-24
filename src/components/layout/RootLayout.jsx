import React from 'react'
import SideBar from './sidebar/SideBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='flex flex-row gap-[20px]  '>
      <div className="sidebar w-[230px] ">
        <SideBar/>
      </div>
      <div className="outlet">
        <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout