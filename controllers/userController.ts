import { Request, Response } from 'express'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/userModel'
import generateToken from '../lib/utils/generateToken'

/**
 * Authenticates user & gets the access token
 * @route POST /api/users/login
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPasswords(password))) {
		generateToken(res, user._id)

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}

	res.send('login user')
})

/**
 * Register new user
 * @route POST /api/users
 */
export const registerUser = asyncHandler(
	async (req: Request, res: Response) => {
		const { name, email, password } = req.body
		const userExists = await User.findOne({ email })

		if (userExists) {
			res.status(400)
			throw new Error('User already exists!')
		}

		const user = await User.create({
			name,
			email,
			password,
			isAdmin: false
		})

		if (user) {
			generateToken(res, user._id)
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin
			})
		} else {
			res.status(400)
			throw new Error('Invalid user data')
		}
	}
)

/**
 * Logout user
 * @route POST /api/users/logout
 */
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
	res.clearCookie('jwt')
	res.status(200).json({ message: 'Logged out successfully' })
})

/**
 * Gets the logged in users profile
 * @route GET /api/users/profile
 */
export const getUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const user = await User.findById(req.user._id)

		if (user) {
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin
			})
		} else {
			res.status(404)
			throw new Error('User not found')
		}
	}
)

/**
 * Update user profile
 * @route PUT /api/users/profile
 */
export const updateUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const user = await User.findById(req.user._id)

		if (user) {
			user.name = req.body.name || user.name
			user.email = req.body.email || user.email

			if (req.body.password) {
				user.password = req.body.password
			}

			const updatedUser = await user?.save()

			return res.status(200).json({
				_id: updatedUser?._id,
				name: updatedUser?.name,
				email: updatedUser?.email,
				isAdmin: updatedUser?.isAdmin
			})
		} else {
			res.status(404)
			throw new Error('User not found')
		}
	}
)

/**
 * Gets all users
 * @route GET /api/users
 */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await User.find({})
	res.status(200).json(users)
})

/**
 * Get user by id
 * @route GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId).select('-password')

	if (user) {
		res.status(200).json(user)
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

/**
 * Deletes user
 * @route DELETE /api/users/:userId
 */
export const deleteUsers = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId)

	if (user) {
		if (user.isAdmin) {
			res.status(400)
			throw new Error('Cannot delete admin user')
		}
		await User.deleteOne({ _id: user._id })
		res.status(200).json({ message: 'User deleted successfully' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

/**
 * Deletes user
 * @route PUT /api/users/:userId
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.userId)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.isAdmin = Boolean(req.body.isAdmin)

		const updatedUser = await user?.save()

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin
		})
	} else {
		res.status(404)
		throw new Error('User not found!')
	}
})
