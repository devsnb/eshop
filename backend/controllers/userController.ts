import { Request, Response } from 'express'
import asyncHandler from '../middleware/asyncHandler'
import User from '../models/userModel'

/**
 * Authenticates user & gets the access token
 * @route POST /api/users/login
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
	res.send('login user')
})

/**
 * Register new user
 * @route POST /api/users
 */
export const registerUser = asyncHandler(
	async (req: Request, res: Response) => {
		res.send('register user')
	}
)

/**
 * Logout user
 * @route POST /api/users/logout
 */
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
	res.send('logout user')
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
