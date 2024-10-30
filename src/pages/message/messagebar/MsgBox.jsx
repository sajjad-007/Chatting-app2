// import React from 'react'
import { useEffect, useState } from 'react'
import UserName from '../../../components/chartUserName/UserName'
import Alert from '../../../components/flowbite/alert/Alert'
import Avatar from '../../../components/flowbite/avatar/Avatar'
import Button from '../../../components/flowbite/button/Button'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { SuccessTost } from '../../../components/utilities/toastify/tostify'
// import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment'
import EmojiPicker from 'emoji-picker-react';

const MsgBox = () => {
    const activeUserData = useSelector((state) => state.msgUserStore.value)    
    const UserData = useSelector((state) => state.logInUser.value)
    const [msginput,setMsgInput] = useState('')
    const [allMsg,setAllMsg] = useState([])
    const db = getDatabase();
    const [show,setShow] = useState(false)
    const [emoji,setEmoji] = useState("")

    let handleMsgInput = (e) => {
        setMsgInput(e.target.value);
        
    }
    // Message write operation
    let handleSubmitBtn = () => {
        set(push(ref(db, 'message')),{
           senderId: UserData.uid,
           senderName: UserData.displayName,
           senderEmail: UserData.email,
           receiverId:  activeUserData.receiverId == UserData.uid 
                        ? activeUserData.senderId : activeUserData.receiverId,
           receiverName: activeUserData.receiverId == UserData.uid 
                        ? activeUserData.senderName : activeUserData.receiverName,
           receiverEmail:  activeUserData.receiverId == UserData.uid 
                        ? activeUserData.senderEmail : activeUserData.receiverEmail,
            message: msginput,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,   
          }).then(()=> {
            setMsgInput("")
            SuccessTost('msg sent');
          })
    }
    // Message read operation
    useEffect(()=>{
        const messageRef = ref(db, 'message'  );
        onValue(messageRef, (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                let activeId = activeUserData?.senderId == UserData.uid 
                ? activeUserData?.receiverId : activeUserData?.senderId
                if (
                    (item.val().receiverId == UserData.uid && item.val().senderId == activeId)
                    ||
                    (item.val().senderId == UserData.uid && item.val().receiverId == activeId)){
                    array.push({...item.val(), id: item.key})
                } 
                
            })
            setAllMsg(array);
            // console.log(array);
            
        });
    },[activeUserData])
    let handleEmojiClick = (e) => {
        setMsgInput(msginput + e.emoji);
        console.log(msginput + e.emoji);
        
    }
  return (
    <>{activeUserData 
        ?
        
        <div className=' w-[550px] h-[600px] rounded-3xl   shadow-2xl bg-white overflow-hidden'>
            <div className='cartItemChild w-full h-[80px] p-5 mb-6 flex items-center justify-between border-b-2 border-b-slate-400'>
                <div className="chartChildFirst flex gap-2">
                    <div className="avatar">
                        <Avatar/>
                    </div>
                    <div className='flex flex-col'>
                        <div className="userName">
                            <UserName text={activeUserData?.senderId == UserData.uid 
                                ? activeUserData?.receiverName 
                                : 
                                activeUserData?.senderName}/>
                        </div>
                        <div className="timeDate">
                            <span className='text-sky-500 text-opacity-50 text-[13px] font-medium'>
                            Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>
                
            <div className='msg-body h-[419px] p-2 overflow-y-scroll'>
            {allMsg.map((item,index)=>(

                (item.senderId == UserData.uid)
                ?
                <div key={index} className="senderPart flex justify-end mt-4 flex-col items-end">
                    <p className='bg-green-400 p-3 rounded-md max-w-[80%] text-slate-200 text-[16px]'>{item.message}</p>
                     <span className='block'>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </span>
                </div>
                :
                
                <div key={index} className="receiverPart flex justify-start mt-4 flex-col items-start">
                    <p className='bg-yellow-400 p-3 rounded-md max-w-[80%] text-slate-200 text-[16px]'>{item.message}</p>
                    <span className='block'>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </span>
                </div>
            ))

            }
                
            </div>
            <div className='mt-2 footer h-[70px] bg-blue-400 w-full rounded-md flex items-center border-t-2 border-t-red-400 relative'>
                <input onChange={handleMsgInput} className='w-80 rounded-md bg-transparent text-white border-slate-200' type="text" placeholder='Write here.....'/>
                {msginput.length > 0
                    ?
                    <Button onClick={handleSubmitBtn} text="Submit" className='mb-2'/>
                    :
                    // <div>
                    // </div>
                    null
                }
                    <>
                    
                        <div className='absolute mb-[524px] ml-[195px]'>
                            <EmojiPicker width='300' open={show} onEmojiClick={handleEmojiClick}/>
                        </div>
                        <Button onClick={()=>setShow(!show)} text="emoji" className='mb-2'/> 
                    </>
            </div>
        </div>
        :
        <div className='w-[500px] h-[605px] rounded-3xl p-5  shadow-2xl'>
            <Alert text="Select a user"/>
        </div>
    }
    
    </>
  )
}

export default MsgBox