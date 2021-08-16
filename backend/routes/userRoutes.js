import express from 'express'

import { authUser,getUsers,getUserById,updateUser,deleteUser, getUserProfile,registerUser, updateUserProfile } from '../controllers/userController.js'

import { protect,admin } from '../middleware/authMiddleware.js'

const router = express.Router()

//@description userLogin
//@route POST /api/user
//@access Public
router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router