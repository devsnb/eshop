import { PRODUCTS_URL } from '../constants'
import { apiSlice } from './apiSlice'
import { Product as ProductType } from '../types'

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query<ProductType[], void>({
			query: () => ({
				url: PRODUCTS_URL
			}),
			keepUnusedDataFor: 5
		}),
		getProductDetails: builder.query<ProductType, string>({
			query: productId => ({
				url: `${PRODUCTS_URL}/${productId}`
			}),
			keepUnusedDataFor: 5
		})
	})
})

export const { useGetProductsQuery, useGetProductDetailsQuery } =
	productApiSlice
