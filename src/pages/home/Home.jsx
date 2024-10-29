import React from 'react'
import ChartList from './chartlist/ChartList'
import FriendReqList from './friendReqList/FriendReqList'
import FriendsList from './friendsList/FriendsList'

const Home = () => {
  return (
    <div className='p-[30px] w-full h-full flex  gap-10 flex-wrap justify-evenly'>
      <ChartList/>
      <FriendReqList/>
      <FriendsList/>
    </div>
  )
}

export default Home