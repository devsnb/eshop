import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'

const generateToken = (res: Response, userId: Types.ObjectId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: '7d'
	})

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000 // 7 days
	})
}

export default generateToken
