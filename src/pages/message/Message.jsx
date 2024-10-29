import React from 'react'
import MsgFriends from './friends/MsgFriends'
import MsgBox from './messagebar/MsgBox'

const Message = () => {
  return (
    <div className='flex gap-4 justify-around p-[30px] pl-[16px]'>
      <MsgFriends/>
      <MsgBox/>
    </div>
  )
}

export default Message