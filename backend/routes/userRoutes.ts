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

const router = express.Router()

router.route('/').get(getUsers).post(registerUser)
router.post('/logout', logoutUser)
router.post('/login', loginUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:userId').delete(deleteUsers).get(getUserById).put(updateUser)

export default router
