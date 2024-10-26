import React, { useEffect, useState } from 'react'
import ChartHead from '../../../components/chartHead/ChartHead'
import './chartlist.css'
import Button from '../../../components/flowbite/button/Button'
import Avatar from '../../../components/flowbite/avatar/Avatar'
import UserName from '../../../components/chartUserName/UserName'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue } from "firebase/database";


const ChartList = () => {
    const UserData = useSelector((state) => state.logInUser.value)
    
    const db = getDatabase();
    const[userList,setUserList] = useState([])
    
    useEffect(()=>{
        const userListRef = ref(db, 'floks'  );
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                array.push({...item.val(), id: item.key})
                // console.log(item.val());
            })
            
            setUserList(array);
            
        // const data = snapshot.val();
        });
    },[])


  return (
    <div className='chartListMain overflow-hidden'>
        <div className='flex items-center justify-between '>
            <ChartHead text='user list'/>
        </div>
        <div className='chartItembox h-[350px] mt-[34px] mb-2 pb-2 overflow-y-scroll'>
            {userList.map((item,index)=>(
                <div key={index} className='cartItemChild w-full h-[80px] mb-6 flex items-center justify-between border-b-2 border-b-slate-400'>
                    <div className="chartChildFirst flex gap-2">
                        <div className="avatar">
                            <Avatar/>
                        </div>
                        <div className='flex flex-col'>
                            <div className="userName">
                                <UserName text={item.displayName}/>
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
            ))}
        </div>
    </div>
  )
}

export default ChartList