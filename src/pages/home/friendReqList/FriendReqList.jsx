// import React from 'react'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/flowbite/button/Button'
import UserName from '../../../components/chartUserName/UserName'
import Avatar from '../../../components/flowbite/avatar/Avatar'
import ChartHead from '../../../components/chartHead/ChartHead'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue } from "firebase/database";

const FriendReqList = () => {
    const UserData = useSelector((state) => state.logInUser.value)
    
    const db = getDatabase();
    const[friendReqList,setFriendReqList] = useState([])
    
    useEffect(()=>{
        const userListRef = ref(db, "friendRequest"  );
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                if ( UserData.uid == item.val().whoReciveFriendReqId ) {
                    array.push({...item.val(), id: item.key})
                } 
            });
            setFriendReqList(array);
        });
    },[])

  return (
    <div className='chartListMain overflow-hidden'>
        <div className='flex items-center justify-between'>
            <ChartHead text='Friend Request List'/>
        </div>
        <div className='chartItembox h-[350px] mt-[34px] mb-2 pb-2 overflow-y-scroll'>
            {friendReqList.map((item,index)=>(
                <div key={index} className='cartItemChild w-full h-[80px] mb-6 flex items-center justify-between border-b-2 border-b-slate-400'>
                    <div className="chartChildFirst flex gap-2">
                        <div className="avatar">
                            <Avatar/>
                        </div>
                        <div className='flex flex-col'>
                            <div className="userName">
                                <UserName text={item.whoSendFriendReqName}/>
                            </div>
                            <div className="timeDate">
                                <span className='text-black text-opacity-50 text-[10px] font-medium'>Today, 8:56pm</span>
                            </div>
                        </div>
                    </div>
                    <div className="chartChildFirst">
                        <Button text='Accept'/>
                        <Button text='Delete'/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FriendReqList