import { Request, Response } from 'express'
import asyncHandler from '../middleware/asyncHandler'
import Order from '../models/orderModel'

/**
 * Create new order
 * @route POST /api/orders
 */
export const addOrderItems = asyncHandler(
	async (req: Request, res: Response) => {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		} = req.body

		if (orderItems && orderItems.length === 0) {
			res.status(400)
			throw new Error('no order items')
		} else {
			const order = new Order({
				orderItems: orderItems.map((x: any) => ({
					...x,
					product: x._id,
					_id: undefined
				})),
				user: req.user._id,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice
			})

			const createdOrder = await order.save()
			res.status(201).json(createdOrder)
		}
	}
)

/**
 * Get logged in user's orders
 * @route GET /api/orders/myorders
 */
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
	const orders = await Order.find({ user: req.user._id })
	res.status(200).json(orders)
})

/**
 * Get order by id
 * @route GET /api/orders/:orderId
 */
export const getOrderById = asyncHandler(
	async (req: Request, res: Response) => {
		const order = await Order.findById(req.params.orderId).populate(
			'user',
			'name email'
		)

		if (order) {
			res.status(200).json(order)
		} else {
			res.status(404)
			throw new Error('order not found')
		}
	}
)

/**
 * Update the payment status of the order
 * @route PUT /api/orders/:orderId/pay
 */
export const updateOderToPaid = asyncHandler(
	async (req: Request, res: Response) => {
		res.send('update order to paid')
	}
)

/**
 * Update the order status to delivered
 * @route PUT /api/orders/:orderId/deliver
 */
export const updateOrderToDelivered = asyncHandler(
	async (req: Request, res: Response) => {
		res.send('update order to delivered')
	}
)

/**
 * Update the order status to delivered
 * @route GET /api/orders
 */
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
	res.send('get all orders')
})
