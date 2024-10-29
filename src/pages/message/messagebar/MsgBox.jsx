// import React from 'react'
import Avatar from '../../../components/flowbite/avatar/Avatar'
import UserName from '../../../components/chartUserName/UserName'
import Button from '../../../components/flowbite/button/Button'

const MsgBox = () => {
  return (
    <div className=' w-[500px] h-[605px] rounded-3xl p-5  shadow-2xl bg-white'>
        <div className='cartItemChild w-full h-[80px] mb-6 flex items-center justify-between border-b-2 border-b-slate-400'>
            <div className="chartChildFirst flex gap-2">
                <div className="avatar">
                    <Avatar/>
                </div>
                <div className='flex flex-col'>
                    <div className="userName">
                        <UserName text='hello'/>
                     </div>
                    <div className="timeDate">
                        <span className='text-black text-opacity-50 text-[10px] font-medium'>Today, 8:56pm</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='h-[400px] bg-red-400'>
            <h1 className='text-white'>body part</h1>
        </div>
        <div className='mt-2'>
                <input className='w-80' type="text" placeholder='Write here.....'/>
                <Button text="Submit"/>
        </div>
    </div>
  )
}

export default MsgBox