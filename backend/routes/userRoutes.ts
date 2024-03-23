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
	.delete(protect, admin, deleteUsers)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)

export default router
