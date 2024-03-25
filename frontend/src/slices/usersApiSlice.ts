import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<
			{ _id: string; name: string; email: string; isAdmin: boolean },
			{ email: string; password: string }
		>({
			query: data => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data
			})
		})
	})
})

export const { useLoginMutation } = userApiSlice
