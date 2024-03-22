import { Request, Response } from 'express'
import asyncHandler from '../middleware/asyncHandler'
import Product from '../models/productModel'

/**
 * Gets all products
 * @route GET /api/products
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
	const products = await Product.find({})
	res.json(products)
})

/**
 * Get single product
 * @route GET /api/products/:productId
 */
export const getProductById = asyncHandler(
	async (req: Request, res: Response) => {
		const productId = req.params['productId']

		const product = await Product.findById(productId)

		if (!product) {
			res.status(404)
			throw new Error('Product not found')
		}

		return res.json(product)
	}
)
