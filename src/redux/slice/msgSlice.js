import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null ,
}

export const activeUserSlice = createSlice({
  name: 'Message',
  initialState,
  reducers: {
    activeUser: (state, action) => {
      state.value = action.payload
      
    },
  },
})

// Action creators are generated for each case reducer function
export const {  activeUser } = activeUserSlice.actions

export default activeUserSlice.reducer