import React from 'react'
import ChartHead from '../../../components/chartHead/ChartHead'
import './chartlist.css'
import Button from '../../../components/flowbite/button/Button'
import Avatar from '../../../components/flowbite/avatar/Avatar'
import UserName from '../../../components/chartUserName/UserName'

const ChartList = () => {
  return (
    <div className='chartListMain overflow-hidden'>
        <div className='flex items-center justify-between '>
            <ChartHead text='user list'/>
        </div>
        <div className='chartItembox h-[350px] mt-[34px] mb-2 pb-2 overflow-y-scroll'>
            <div className='cartItemChild w-full h-[80px] mb-6 flex items-center justify-between border-b-2 border-b-slate-400'>
                <div className="chartChildFirst flex gap-2">
                    <div className="avatar">
                        <Avatar/>
                    </div>
                    <div className='flex flex-col'>
                        <div className="userName">
                            <UserName text='sajjad'/>
                        </div>
                        <div className="timeDate">
                            <span className='text-black text-opacity-50 text-[10px] font-medium'>Today, 8:56pm</span>
                        </div>
                    </div>
                </div>
                <div className="chartChildFirst">
                    <Button text='add'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChartList