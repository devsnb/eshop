import express from 'express'
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getTopProducts
} from '../controllers/productController'
import { protect, admin } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.get('/top', getTopProducts)

router
	.route('/:productId')
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct)
router.route('/:productId/reviews').post(protect, createProductReview)

export default router
