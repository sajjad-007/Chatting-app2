// import React from 'react'
import ChartHead from '../../../components/chartHead/ChartHead'
import UserName from '../../../components/chartUserName/UserName'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { SuccessTost } from '../../../components/utilities/toastify/tostify'
import Alert from '../../../components/flowbite/alert/Alert'
import { useEffect, useState } from 'react';
import Avatar from '../../../components/flowbite/avatar/Avatar';
import Button from '../../../components/flowbite/button/Button';

const FriendsList = () => {
    const UserData = useSelector((state) => state.logInUser.value)
    const db = getDatabase();
    const[friends,setFriends] = useState([])

    useEffect(()=>{
        const userListRef = ref(db, 'friends'  );
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                if (UserData.uid == item.val().senderId || UserData.uid == item.val().receiverId) {
                    array.push({...item.val(), id: item.key})
                } 
            })
            setFriends(array);   
        });
    },[])

    let handleUnfriend = (unFriendinfo) => {
        remove(ref(db, 'friends/' + unFriendinfo.id))
    }
  return (
    <div className='chartListMain overflow-hidden'>
        <div className='flex items-center justify-between '>
            <ChartHead text='friends list'/>
        </div>
        <div className='chartItembox h-[350px] mt-[34px] mb-2 pb-2 overflow-y-scroll'>
            {friends.length > 0 ? 
            friends.map((item,index)=>(
                <div key={index} className='cartItemChild w-full h-[80px] mb-6 flex items-center justify-between border-b-2 border-b-slate-400'>
                    <div className="chartChildFirst flex gap-2">
                        <div className="avatar">
                            <Avatar/>
                        </div>
                        <div className='flex flex-col'>
                            <div className="userName">
                                <UserName text={UserData.uid == item.receiverId 
                                    ?
                                    item.senderName
                                    :
                                    item.receiverName
                                }/>
                            </div>
                            <div className="timeDate">
                                <span className='text-black text-opacity-50 text-[10px] font-medium'>Today, 8:56pm</span>
                            </div>
                        </div>
                    </div>
                    <div className="chartChildFirst">
                        <Button onClick={()=>handleUnfriend(item)} text='Unfriend'/>
                        <Button text='block'/>
                    </div>
                </div>
            ))
            :
            <Alert text="dont't have any friends yet"/>
            }
        </div>
    </div>
  )
}

export default FriendsList