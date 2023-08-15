import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const orderApi = createApi({
    reducerPath: "orderApiPath",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SETVER_URL}/api/order`,
        withCredentials: true,
        credentials: 'include',
        prepareHeaders: (Headers) => {
            const token = localStorage.getItem("Authorization")

            if (!token) return Headers
            Headers.set("Authorization", token)
            return Headers
        }
    }),
    tagTypes: ["getCart"],
    endpoints: (builder) => ({

        createOrder: builder.mutation({
            query: () => ({
                url: "/add",
                method: "Post",
                body: {}
            }),
            invalidatesTags: ["getCart"],
            keepUnusedDataFor: 0.1,

        }),
    }),
})



export const {
    useCreateOrderMutation
} = orderApi