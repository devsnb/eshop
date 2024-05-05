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

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect, getMyOrders)
router.route('/:orderId').get(protect, getOrderById)
router.route('/:orderId/pay').post(protect, updateOderToPaid)
router.route('/:orderId/deliver').put(protect, admin, updateOrderToDelivered)

export default router
