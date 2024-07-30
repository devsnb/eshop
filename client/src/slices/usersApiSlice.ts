import { USERS_URL } from '../constants'
import { apiSlice } from './apiSlice'

type User = {
	_id: string
	name: string
	email: string
	isAdmin: boolean
	updatedAt: string
	createdAt: string
}

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
		}),
		getUsers: builder.query<User[], void>({
			query: () => ({
				url: `${USERS_URL}`,
				method: 'GET'
			}),
			providesTags: ['User'],
			keepUnusedDataFor: 5
		}),
		deleteUser: builder.mutation({
			query: (userId: string) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE'
			})
		}),
		getUserDetails: builder.query<User, string>({
			query: (userId: string) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'GET'
			}),
			keepUnusedDataFor: 5
		}),
		updateUser: builder.mutation({
			query: (data: {
				userId: string
				name: string
				email: string
				isAdmin: boolean
			}) => ({
				url: `${USERS_URL}/${data.userId}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['User']
		})
	})
})

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
	useGetUserDetailsQuery,
	useUpdateUserMutation
} = userApiSlice
