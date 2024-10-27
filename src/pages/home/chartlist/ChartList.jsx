import React, { useEffect, useState } from 'react'
import ChartHead from '../../../components/chartHead/ChartHead'
import './chartlist.css'
import Button from '../../../components/flowbite/button/Button'
import Avatar from '../../../components/flowbite/avatar/Avatar'
import UserName from '../../../components/chartUserName/UserName'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { SuccessTost } from '../../../components/utilities/toastify/tostify'


const ChartList = () => {
    const UserData = useSelector((state) => state.logInUser.value)
    // console.log(UserData);
    
    
    const db = getDatabase();
    const[userList,setUserList] = useState([])
    const[friendReqList,setfriendReqList] = useState([])
    // Read operation for UserList
    useEffect(()=>{
        const userListRef = ref(db, 'floks'  );
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                // je logIn ache tar id judi (UserData.uid) firebase e je item gula ache tader modde je kono ekta item er idr shatheo judi id mile jay tahole je log in ache tar id ta rekhe baki gula push hobe  
                if (UserData.uid != item.key) {
                    array.push({...item.val(), id: item.key})
                } 
                // console.log(item.key);
            })
            // console.log(array);
            setUserList(array);
        });
    },[])

    // Read operation for FriendRequestList
    useEffect(()=>{
        const userListRef = ref(db, 'friendRequest'  );
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                if (UserData.uid == item.val().whoSendFriendReqId) {
                    array.push(UserData.uid + item.uid)
                } 
            })
            // console.log(array);
            setfriendReqList(array);
        });
    },[])

    let handleAddFriendBtn = (addFriendInfo) => {
        set(push(ref(db, 'friendRequest')),{
            whoSendFriendReqId: UserData.uid,
            whoSendFriendReqName: UserData.displayName,
            whoSendFriendReqEmail: UserData.email,
            // whoSendFriendReqPhotoUrl: UserData.photoUrl,
            whoReciveFriendReqId: addFriendInfo.userId,
            whoReciveFriendReqName: addFriendInfo.displayName,
            whoReciveFriendReqEmail: addFriendInfo.email,
            // whoReciveFriendReqPhotoUrl: addFriendInfo.photoUrl,
          }).then(()=> {
            SuccessTost('friend request done');
          })
    }

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
                        { friendReqList.includes(item.uid + UserData.uid) || friendReqList.includes(UserData.uid + item.uid)
                            ?

                            <Button text='Cancle'/>
                            :
                            <Button onClick={()=>handleAddFriendBtn(item)} text='Add'/>

                        }
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChartList