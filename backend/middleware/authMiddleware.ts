import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler'
import User from '../models/userModel'

// auth middleware
export const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token

		token = req.cookies['jwt']

		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET!)

				if (typeof decoded !== 'string') {
					req.user = await User.findById(decoded.userId).select('-password')

					next()
				}
			} catch (error: any) {
				console.error(error)
				res.status(401)
				throw new Error('Not authorized, token failed')
			}
		} else {
			res.status(401)
			throw new Error('Not authorized, no token')
		}
	}
)

// Admin middleware
export const admin = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		if (req.user && req.user.isAdmin) {
			next()
		} else {
			res.status(401)
			throw new Error('Not authorized')
		}
	}
)
