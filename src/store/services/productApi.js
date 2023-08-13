import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productApi = createApi({
    reducerPath: "productApiPath",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SETVER_URL}/api/product`,
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

        addProduct: builder.mutation({
            query: (body) => ({
                url: "/addproduct",
                method: "POST",
                body: { ...body }
            }),
            invalidatesTags: ["getProduct"],
            keepUnusedDataFor: 0.001,
        }),

        getSellerProduct: builder.query({
            query: (user, limit = 0, page = 0) => `/info/all?page=${page}&limit=${limit}&sellerId=${user}`,
            providesTags: ["getProduct"],
            keepUnusedDataFor: 0.001,
        }),
    }),
})



export const {
    useAddProductMutation,
    useLazyGetSellerProductQuery
} = productApi