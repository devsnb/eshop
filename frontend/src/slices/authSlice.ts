import { createSlice } from '@reduxjs/toolkit'

type UserInfoType = {
	_id: string
	name: string
	email: string
	isAdmin: boolean
}

const initialState: {
	userInfo: UserInfoType | null
} = {
	userInfo: localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo')!)
		: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: {
				type: string
				payload: UserInfoType
			}
		) => {
			state.userInfo = action.payload
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
			const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000
			localStorage.setItem('expirationTime', String(expirationTime))
		},
		logout: (state, _: { type: string; payload: void }) => {
			state.userInfo = null
			localStorage.clear()
		}
	}
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
