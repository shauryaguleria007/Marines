import { configureStore } from '@reduxjs/toolkit'
import { userApi } from "./services/userApi"
import { productApi } from "./services/productApi"
import { orderApi } from "./services/orderApi"
import userReducer from "./features/userSlice"
import { useSelector } from 'react-redux'
export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(productApi.middleware).concat(orderApi.middleware)
})


export const getUser = () => useSelector(state => state.userSlice.user)