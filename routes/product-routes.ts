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

const productRouter = express.Router()

productRouter.route('/').get(getProducts).post(protect, admin, createProduct)

productRouter.get('/top', getTopProducts)

productRouter
	.route('/:productId')
	.get(checkObjectId({ id: 'productId' }), getProductById)
	.put(protect, admin, checkObjectId({ id: 'productId' }), updateProduct)
	.delete(protect, admin, checkObjectId({ id: 'productId' }), deleteProduct)

productRouter
	.route('/:productId/reviews')
	.post(protect, checkObjectId({ id: 'productId' }), createProductReview)

export default productRouter
