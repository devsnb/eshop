import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode
	let message = err.message

	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		message = 'Resource not found'
		statusCode = 404
	}

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_END === 'production' ? undefined : err.stack
	})
}
