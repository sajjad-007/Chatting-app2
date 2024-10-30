import React, { useEffect, useState } from 'react'
import ChartHead from '../../../components/chartHead/ChartHead'
import './chartlist.css'
import Button from '../../../components/flowbite/button/Button'
import Avatar from '../../../components/flowbite/avatar/Avatar'
import UserName from '../../../components/chartUserName/UserName'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { SuccessTost } from '../../../components/utilities/toastify/tostify'
import Alert from '../../../components/flowbite/alert/Alert'


const ChartList = () => {
    const UserData = useSelector((state) => state.logInUser.value)
    const db = getDatabase();
    const[userList,setUserList] = useState([])
    const[friendReqList,setfriendReqList] = useState([])
    const[friendsList,setFriendsList] = useState([])
   
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
            })
            setUserList(array);
        });
    },[])
   

    // Read operation for FriendRequestList
    useEffect(()=>{
        const userListRef = ref(db, 'friendRequest'  );
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                if (UserData.uid == item.val().whoSendFriendReqId || UserData.uid == item.val().whoReciveFriendReqId) {
                    array.push(item.val().whoSendFriendReqId + item.val().whoReciveFriendReqId)
                } 
            })
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
    useEffect(()=>{
        const userListRef = ref(db, 'friends'  );
        onValue(userListRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                if (UserData.uid == item.val().senderId || UserData.uid == item.val().receiverId) {
                    array.push(item.val().senderId + item.val().receiverId)
                } 
            })
            setFriendsList(array);
            
        });
    },[])

  return (
    <div className='chartListMain overflow-hidden'>
        <div className='flex items-center justify-between '>
            <ChartHead text='user list'/>
        </div>
        <div className='chartItembox h-[350px] mt-[34px] mb-2 pb-2 overflow-y-scroll'>
            {userList.length > 0 ? 
            userList.map((item,index)=>(
                <div key={index} className='cartItemChild w-full h-[80px] mb-6 flex items-center justify-between border-b-2 border-b-slate-400'>
                    <div className="chartChildFirst flex gap-2">
                        <div className="avatar">
                            <Avatar/>
                        </div>
                        <div className='flex flex-col'>
                            <div className="userName w-2">
                                <UserName text={item.displayName}/>
                            </div>
                            <div className="timeDate">
                                <span className='text-black text-opacity-50 text-[10px] font-medium'>Today, 8:56pm</span>
                            </div>
                        </div>
                    </div>
                    <div className="chartChildFirst">
                            {/* // includes er kaj holo ekta array er modde ekti nirdisto jinis khoja  eti true or false value return korbe*/}
                            {friendReqList.includes(UserData.uid + item.id) || friendReqList.includes(item.id+ UserData.uid )
                            ?
                            <Button text='Cancle'/>
                            :
                                friendsList.includes(UserData.uid + item.id) || friendsList.includes(item.id+ UserData.uid )
                                ?
                                    <Button text='friends'/>

                                :
                                    <Button onClick={()=>handleAddFriendBtn(item)} text='Add'/>
                            }
                    </div>
                </div>
            ))
            :
            <Alert text="dont't have any user yet"/>
            }
        </div>
    </div>
  )
}

export default ChartList