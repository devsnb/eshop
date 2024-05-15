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
import checkObjectId from '../middleware/checkObjectId'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.get('/top', getTopProducts)

router
	.route('/:productId')
	.get(checkObjectId({ id: 'productId' }), getProductById)
	.put(protect, admin, checkObjectId({ id: 'productId' }), updateProduct)
	.delete(protect, admin, checkObjectId({ id: 'productId' }), deleteProduct)

router
	.route('/:productId/reviews')
	.post(protect, checkObjectId({ id: 'productId' }), createProductReview)

export default router
