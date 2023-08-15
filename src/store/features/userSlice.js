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
                email: action.payload.email,
                role: action.payload.role,
                id: action.payload.id
            }
        },
        clearState: (state) => {
            return initialState
        }
    }
})



export const { setUser, clearState } = userSlice.actions
export default userSlice.reducer