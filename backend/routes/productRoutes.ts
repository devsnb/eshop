import express from 'express'
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct
} from '../controllers/productController'
import { protect, admin } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router
	.route('/:productId')
	.get(getProductById)
	.put(protect, admin, updateProduct)

export default router
