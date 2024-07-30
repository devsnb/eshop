import { type Cart } from '../slices/cartSlice'

export const addDecimals = (num: number): number => {
	return Number.parseFloat((Math.round(num * 100) / 100).toFixed(2))
}

export const updateCart = (state: Cart) => {
	// calculate items price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)

	// calculate shipping price, if over 100 0 otherwise 10
	state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

	// calculate tax price
	state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
	// calculate total price
	state.totalPrice = addDecimals(
		state.itemsPrice + state.shippingPrice + state.taxPrice
	)

	localStorage.setItem('cart', JSON.stringify(state))
}
