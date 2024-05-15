import express from 'express'
import {
	getOrders,
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOderToPaid,
	updateOrderToDelivered
} from '../controllers/orderController'
import { admin, protect } from '../middleware/authMiddleware'
import checkObjectId from '../middleware/checkObjectId'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect, getMyOrders)
router
	.route('/:orderId')
	.get(protect, checkObjectId({ id: 'orderId' }), getOrderById)
router
	.route('/:orderId/pay')
	.post(protect, checkObjectId({ id: 'orderId' }), updateOderToPaid)
router
	.route('/:orderId/deliver')
	.put(protect, admin, checkObjectId({ id: 'orderId' }), updateOrderToDelivered)

export default router
