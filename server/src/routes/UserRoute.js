import express from 'express'
import { getProfile, updateProfile, changePassword, deviceInfo, updateProfilePic } from '../controllers/UserController.js'
import upload from '../middleware/upload.js'

const router = express()

router.get('/getProfile/:token', getProfile)
router.put('/updateProfile/:token', upload.single('profilePic'), updateProfile)

router.put('/updateProfilePic/:token', upload.single('profilePic'), updateProfilePic)

router.put('/changePassword/:token', changePassword)
router.get('/deviceInfo/:token', deviceInfo)

export default router