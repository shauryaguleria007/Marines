import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath: "authApiPath",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SETVER_URL}/api/user`, prepareHeaders: (Headers) => {
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
        AuthorizeUser: builder.query({
            query: () => "/authorizeuser",
            keepUnusedDataFor: 0.001,

        }),
        AuthorizeSeller: builder.query({
            query: () => "/authorizeseller",
            keepUnusedDataFor: 0.001,

        }), AuthorizeAdmin: builder.query({
            query: () => "/authorizeadmin",
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


export const { useAutenticateUserQuery,
    useAuthorizeAdminQuery,
    useAuthorizeSellerQuery,
    useAuthorizeUserQuery,
    useLoginUserMutation,
    useRegisterSellerMutation,
    useRegisterUserMutation
} = userApi