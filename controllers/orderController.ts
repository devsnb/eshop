import { Request, Response } from 'express'
import asyncHandler from '../middleware/asyncHandler'
import Order from '../models/orderModel'
import Product from '../models/productModel'
import { calcPrices } from '../lib/utils/calcPrices'
import { verifyPayPalPayment, checkIfNewTransaction } from '../lib/utils/paypal'

/**
 * Create new order
 * @route POST /api/orders
 */
export const addOrderItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod } = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
	} else {
		// get the ordered items from our database
		const itemsFromDB = await Product.find({
			_id: { $in: orderItems.map((x: any) => x._id) }
		})

		// map over the order items and use the price from our items from database
		const dbOrderItems = orderItems.map((itemFromClient: any) => {
			const matchingItemFromDB = itemsFromDB.find(
				itemFromDB => itemFromDB._id.toString() === itemFromClient._id
			)
			return {
				...itemFromClient,
				product: itemFromClient._id,
				price: matchingItemFromDB?.price,
				_id: undefined
			}
		})

		// calculate prices
		const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
			calcPrices(dbOrderItems)

		const order = new Order({
			orderItems: dbOrderItems,
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
})

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
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const { verified, value } = await verifyPayPalPayment(req.body.id)
	if (!verified) throw new Error('Payment not verified')

	// check if this transaction has been used before
	const isNewTransaction = await checkIfNewTransaction(Order, req.body.id)
	if (!isNewTransaction) throw new Error('Transaction has been used before')

	const order = await Order.findById(req.params.orderId)

	if (order) {
		// check the correct amount was paid
		const paidCorrectAmount = order.totalPrice.toString() === value
		if (!paidCorrectAmount) throw new Error('Incorrect amount paid')

		order.isPaid = true
		order.paidAt = new Date()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address
		}

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

/**
 * Update the order status to delivered
 * @route PUT /api/orders/:orderId/deliver
 */
export const updateOrderToDelivered = asyncHandler(
	async (req: Request, res: Response) => {
		const order = await Order.findById(req.params.orderId)

		if (order) {
			order.isDelivered = true
			order.deliveredAt = new Date()

			const updatedOrder = await order.save()

			res.status(200).json(updatedOrder)
		} else {
			res.status(404)
			throw new Error('Order not found')
		}
	}
)

/**
 * Get All Orders
 * @route GET /api/orders
 */
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.status(200).json(orders)
})
