import { configureStore } from '@reduxjs/toolkit'
import authSlice  from '../slice/authSlice'
import activeUserSlice  from '../slice/msgSlice'

export const store = configureStore({
  reducer: {
    logInUser: authSlice,
    msgUserStore: activeUserSlice,
  },
})