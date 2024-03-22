import express from 'express'
import { getProducts, getProductById } from '../controllers/productController'

const router = express.Router()

router.get('/', getProducts)
router.get('/:productId', getProductById)

export default router
