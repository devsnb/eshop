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

const router = express.Router()

router.route('/').get(protect, admin, getUsers).post(registerUser)
router.post('/logout', logoutUser)

router.post('/login', loginUser)

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

router
	.route('/:userId')
	.delete(protect, admin, checkObjectId({ id: 'userId' }), deleteUsers)
	.get(protect, admin, checkObjectId({ id: 'userId' }), getUserById)
	.put(protect, admin, checkObjectId({ id: 'userId' }), updateUser)

export default router
