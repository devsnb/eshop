import { createSlice } from '@reduxjs/toolkit'

type UserInfoType = {
	_id: string
	name: string
	email: string
	isAdmin: boolean
}

const initialState: {
	userInfo: UserInfoType
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
		}
	}
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer
