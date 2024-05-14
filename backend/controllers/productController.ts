import { Request, Response } from 'express'
import asyncHandler from '../middleware/asyncHandler'
import Product from '../models/productModel'

/**
 * Gets all products
 * @route GET /api/products
 */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
	const pageSize = 8
	const page = Number(req.query.pageNum) || 1

	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {}

	const count = await Product.countDocuments({ ...keyword })

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

		res.status(201).json(createdProduct)
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

/**
 * Delete Product
 * @route DELETE /api/products/:productId
 */
export const deleteProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const product = await Product.findById(req.params.productId)

		if (product) {
			await Product.deleteOne({ _id: product._id })
			res.status(200).json({ message: 'Product deleted' })
		} else {
			res.status(404)
			throw new Error('Resource not found')
		}
	}
)

/**
 * Create a new Review
 * @route POST /api/products/:productId/reviews
 */
export const createProductReview = asyncHandler(
	async (req: Request, res: Response) => {
		const { rating, comment } = req.body

		const product = await Product.findById(req.params.productId)

		if (product) {
			const alreadyReviewed = product.reviews.find(
				review => review.user.toString() === req.user._id.toString()
			)

			if (alreadyReviewed) {
				res.status(400)
				throw new Error('Product already reviewed')
			}
			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id
			}

			product.reviews.push(review)

			product.numReviews = product.reviews.length

			product.rating = product.reviews.reduce(
				(acc, review) => acc + review.rating,
				0
			)

			await product.save()
			res.status(201).json({ message: 'Review added' })
		} else {
			res.status(404)
			throw new Error('Product not found')
		}
	}
)
