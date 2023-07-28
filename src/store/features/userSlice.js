import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: null,
}





export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {
                name: action.payload.name,
                email: action.payload.email
            }
        }
    }
})



export const { setUser } = userSlice.actions
export default userSlice.reducer