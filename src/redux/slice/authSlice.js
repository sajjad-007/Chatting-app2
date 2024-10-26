import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("LoggedInUser") ? JSON.parse(localStorage.getItem("LoggedInUser"))  : null ,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogInUser: (state, action) => {
        //action = type check korbe (authLogInUser)
        //playload = initialState er value
      state.value = action.payload
      
    },
  },
})

// Action creators are generated for each case reducer function
export const {  authLogInUser } = authSlice.actions

export default authSlice.reducer