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
		}),
		logout: builder.mutation<{ message: string }, void>({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST'
			})
		}),
		register: builder.mutation<
			{ _id: string; name: string; email: string; isAdmin: boolean },
			{ name: string; email: string; password: string }
		>({
			query: data => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data
			})
		}),
		profile: builder.mutation({
			query: (data: {
				_id: string
				name: string
				email: string
				password: string
			}) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data
			})
		})
	})
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileMutation
} = userApiSlice
