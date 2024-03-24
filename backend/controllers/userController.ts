import { Request, Response } from 'express'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/userModel'
import generateToken from '../utils/generateToken'

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
				email: user.email
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
		res.send('get user profile')
	}
)

/**
 * Update user profile
 * @route PUT /api/users/profile
 */
export const updateUserProfile = asyncHandler(
	async (req: Request, res: Response) => {
		res.send('update user')
	}
)

/**
 * Gets all users
 * @route GET /api/users
 */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
	res.send('get users')
})

/**
 * Get user by id
 * @route GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
	res.send('get user by id')
})

/**
 * Deletes user
 * @route DELETE /api/users/:userId
 */
export const deleteUsers = asyncHandler(async (req: Request, res: Response) => {
	res.send('delete user')
})

/**
 * Deletes user
 * @route PUT /api/users/:userId
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
	res.send('update user')
})
