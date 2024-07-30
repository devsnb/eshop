import express from 'express'
import {
	deleteUsers,
	getUserById,
	getUserProfile,
	getUsers,
	loginUser,
	logoutUser,
	registerUser,
	updateUser,
	updateUserProfile
} from '../controllers/userController'
import { admin, protect } from '../middleware/authMiddleware'
import checkObjectId from '../middleware/checkObjectId'

const userRouter = express.Router()

userRouter.route('/').get(protect, admin, getUsers).post(registerUser)
userRouter.post('/logout', logoutUser)

userRouter.post('/login', loginUser)

userRouter
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

userRouter
	.route('/:userId')
	.delete(protect, admin, checkObjectId({ id: 'userId' }), deleteUsers)
	.get(protect, admin, checkObjectId({ id: 'userId' }), getUserById)
	.put(protect, admin, checkObjectId({ id: 'userId' }), updateUser)

export default userRouter
