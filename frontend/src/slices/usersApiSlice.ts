import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: (data: { email: string; password: string }) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data
			})
		})
	})
})

export const { useLoginMutation } = userApiSlice
