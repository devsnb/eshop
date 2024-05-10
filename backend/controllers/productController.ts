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

/**
 * Create New Product
 * @route POST /api/products
 */
export const createProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const product = new Product({
			name: 'Sample name',
			price: 0,
			user: req.user._id,
			image: '/images/sample.jpg',
			brand: 'Sample brand',
			category: 'Sample Category',
			countInStock: 0,
			numReviews: 0,
			description: 'Sample description'
		})

		const createdProduct = await product.save()

		res.status(201).json(createProduct)
	}
)

/**
 * Update a  product
 * @route PUT /api/products/:productId
 */
export const updateProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { name, price, description, image, brand, category, countInStock } =
			req.body

		const product = await Product.findById(req.params.productId)

		if (product) {
			product.name = name
			product.price = price
			product.image = image
			product.brand = brand
			product.category = category
			product.countInStock = countInStock
			product.description = description

			const updateProduct = await product.save()
			res.json(updateProduct)
		} else {
			res.status(404)
			throw new Error('Resource not found')
		}
	}
)
