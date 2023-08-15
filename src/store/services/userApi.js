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
    tagTypes: ["getCart", "AUTHENTICATE"],

    endpoints: (builder) => ({
        AutenticateUser: builder.query({
            query: () => "/authenticate",
            providesTags: ["AUTHENTICATE"],
            keepUnusedDataFor: 0.1,

        }),
        emailVerification: builder.mutation({
            query: () => ({
                url: "/verification/send",
                method: "GET",
            }),
            invalidatesTags: ["AUTHENTICATE"],
            keepUnusedDataFor: 0.1,

        }),
        getCartData: builder.query({
            query: () => "/cart/data",
            providesTags: ["getCart"],
            keepUnusedDataFor: 0.1,

        }),
        addTocart: builder.mutation({
            query: (body) => ({
                url: "/cart/add",
                method: "POST",
                body
            }),
            invalidatesTags: ["getCart"],
            keepUnusedDataFor: 0.1,
        }),
        removeFromcart: builder.mutation({
            query: (body) => ({
                url: "/cart/remove",
                method: "POST",
                body
            }),
            invalidatesTags: ["getCart"],
            keepUnusedDataFor: 0.1,
        }),
        LoginUser: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body
            }),
            keepUnusedDataFor: 0.1,
        }),
        RegisterUser: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body
            }),
            keepUnusedDataFor: 0.1,
        }),
        RegisterSeller: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body: { ...body, role: "SELLER" }
            }),
            keepUnusedDataFor: 0.1,
        }),
    })
}
)


export const {
    useAutenticateUserQuery,
    useLoginUserMutation,
    useRegisterSellerMutation,
    useRegisterUserMutation,
    useLazyGetCartDataQuery,
    useAddTocartMutation,
    useGetCartDataQuery,
    useRemoveFromcartMutation,
    useEmailVerificationMutation
} = userApi