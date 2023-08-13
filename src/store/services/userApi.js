import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: "userApiPath",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SETVER_URL}/api/user`,
        withCredentials: true,
        credentials: 'include',
        prepareHeaders: (Headers) => {
            const token = localStorage.getItem("Authorization")

            if (!token) return Headers
            Headers.set("Authorization", token)
            return Headers
        }
    }),

    endpoints: (builder) => ({
        AutenticateUser: builder.query({
            query: () => "/authenticate",
            keepUnusedDataFor: 0.001,

        }),
        LoginUser: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body
            }),
            keepUnusedDataFor: 0.001,
        }),
        RegisterUser: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body
            }),
            keepUnusedDataFor: 0.001,
        }),
        RegisterSeller: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body: { ...body, role: "SELLER" }
            }),
            keepUnusedDataFor: 0.001,
        }),
    })
}
)


export const {
    useAutenticateUserQuery,
    useLoginUserMutation,
    useRegisterSellerMutation,
    useRegisterUserMutation
} = userApi