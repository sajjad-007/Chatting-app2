import React from 'react'
import ChartList from './chartlist/ChartList'
import FriendReqList from './friendReqList/FriendReqList'

const Home = () => {
  return (
    <div className='p-[30px] w-full h-full flex  gap-36 flex-wrap justify-between'>
      <ChartList/>
      <FriendReqList/>
    </div>
  )
}

export default Home