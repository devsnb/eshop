import { Request, Response, NextFunction } from 'express'

type AsyncRouteHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => any

const asyncHandler =
	(fn: AsyncRouteHandler) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next)
	}

export default asyncHandler
