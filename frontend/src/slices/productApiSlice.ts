import { PRODUCTS_URL } from '../constants'
import { apiSlice } from './apiSlice'
import { Product as ProductType } from '../types'

type UpdateProductParm = {
	productId: string
	name: string
	price: number
	brand: string
	category: string
	countInStock: number
	description: string
}

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query<ProductType[], void>({
			query: () => ({
				url: PRODUCTS_URL
			}),
			providesTags: ['Product'],
			keepUnusedDataFor: 5
		}),
		getProductDetails: builder.query<ProductType, string>({
			query: productId => ({
				url: `${PRODUCTS_URL}/${productId}`
			}),
			keepUnusedDataFor: 5
		}),
		createProduct: builder.mutation<any, void>({
			query: () => ({
				url: `${PRODUCTS_URL}`,
				method: 'POST'
			}),
			invalidatesTags: ['Product']
		}),
		updateProduct: builder.mutation({
			query: (data: UpdateProductParm) => ({
				url: `${PRODUCTS_URL}/${data.productId}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Product']
		})
	})
})

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation
} = productApiSlice
