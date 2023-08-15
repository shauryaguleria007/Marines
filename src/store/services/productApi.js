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
            keepUnusedDataFor: 0.1,
        }),

        getSellerProduct: builder.query({
            query: (user, limit = 0, page = 0) => `/info/all?page=${page}&limit=${limit}&sellerId=${user}`,
            providesTags: ["getProduct"],
            keepUnusedDataFor: 0.1,
        }),
        getProductById: builder.query({
            query: (id) => `/info/${id}`,
            providesTags: (result, error, id) => { return [{ type: 'PID', id }] },
            keepUnusedDataFor: 0.1,
        }),
        getAllProduct: builder.query({
            query: (limit = 0, page = 0) => `/info/all?page=${page}&limit=${limit}`,
            keepUnusedDataFor: 0.1,
        }),
        addImage: builder.mutation({
            query: ({ id, formData }) => {
                console.log(formData);
                return ({
                    url: `/upload/${id}`,
                    method: "POST",
                    body: formData
                })
            },
            invalidatesTags: ["getProduct"],
            keepUnusedDataFor: 0.1,
        }),
    }),
})



export const {
    useAddProductMutation,
    useLazyGetSellerProductQuery,
    useAddImageMutation,
    useGetAllProductQuery,
    useLazyGetProductByIdQuery
} = productApi