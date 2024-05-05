import { apiSlice } from './apiSlice'
import { ORDERS_URL, PAYPAL_URL } from '../constants'
type User = {
	_id: string
	name: string
	email: string
}

type ShippingAddress = {
	address: string
	city: string
	country: string
	pin: string
	postalCode: string
}

type OrderItem = {
	_id: string
	image: string
	name: string
	price: number
	product: string
	qty: number
}

type Order = {
	_id: string
	createdAt: string
	isDelivered: boolean
	isPaid: boolean
	itemPrice: number
	orderItems: OrderItem[]
	paymentMethod: string
	shippingAddress: ShippingAddress
	shippingPrice: number
	taxPrice: number
	totalPrice: number
	updatedAt: string
	deliveredAt?: string
	paidAt?: string
	user: User
}

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		createOrder: builder.mutation({
			query: order => ({
				url: ORDERS_URL,
				method: 'POST',
				body: {
					...order
				}
			})
		}),
		getOrderDetails: builder.query<Order, string>({
			query: orderId => ({
				url: `${ORDERS_URL}/${orderId}`
			}),
			keepUnusedDataFor: 5
		}),
		payOrder: builder.mutation({
			query: ({ orderId, details }: { orderId: string; details: any }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: 'POST',
				body: {
					...details
				}
			})
		}),
		getPayPalClientId: builder.query<{ clientId: string }, void>({
			query: () => ({
				url: PAYPAL_URL
			}),
			keepUnusedDataFor: 5
		}),
		getMyOrders: builder.query<Order[], void>({
			query: () => ({
				url: `${ORDERS_URL}/mine`
			}),
			keepUnusedDataFor: 5
		})
	})
})

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPayPalClientIdQuery,
	useGetMyOrdersQuery
} = orderApiSlice
