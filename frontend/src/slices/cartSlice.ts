import { createSlice } from '@reduxjs/toolkit'
import { Product as ProductType } from '../types'
import { updateCart } from '../utils/cartUtils'

export type CartProduct = {
	qty: number
} & ProductType

export type Cart = {
	cartItems: CartProduct[]
	itemsPrice: number
	shippingPrice: number
	taxPrice: number
	totalPrice: number
}

const initialState: Cart = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart')!)
	: { cartItems: [] }

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (
			state,
			action: {
				type: string
				payload: CartProduct
			}
		) => {
			const item = action.payload
			const existItem = state.cartItems.find(x => x._id === item._id)

			if (existItem) {
				state.cartItems = state.cartItems.map(x =>
					x._id === existItem._id ? item : x
				)
			} else {
				state.cartItems = [...state.cartItems, item]
			}

			updateCart(state)
		},
		removeFromCart: (
			state,
			action: {
				type: string
				payload: string
			}
		) => {
			state.cartItems = state.cartItems.filter(x => x._id !== action.payload)

			updateCart(state)
		}
	}
})

export const { addToCart, removeFromCart } = cartSlice.actions

export const { reducer: cartSliceReducer } = cartSlice
