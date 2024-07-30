import express from 'express'
import {
	getOrders,
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered
} from '../controllers/orderController'
import { admin, protect } from '../middleware/authMiddleware'
import checkObjectId from '../middleware/checkObjectId'

const orderRouter = express.Router()

orderRouter
	.route('/')
	.post(protect, addOrderItems)
	.get(protect, admin, getOrders)

orderRouter.route('/mine').get(protect, getMyOrders)

orderRouter
	.route('/:orderId')
	.get(protect, checkObjectId({ id: 'orderId' }), getOrderById)

orderRouter
	.route('/:orderId/pay')
	.post(protect, checkObjectId({ id: 'orderId' }), updateOrderToPaid)

orderRouter
	.route('/:orderId/deliver')
	.put(protect, admin, checkObjectId({ id: 'orderId' }), updateOrderToDelivered)

export default orderRouter
