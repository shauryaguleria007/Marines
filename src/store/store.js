import { configureStore } from '@reduxjs/toolkit'
import { userApi } from "./services/userApi"
import userReducer from "./features/userSlice"
import { useSelector } from 'react-redux'
export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
})


export const getUser = () => useSelector(state => state.userSlice.user)