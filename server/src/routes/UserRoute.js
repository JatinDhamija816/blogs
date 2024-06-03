import express from 'express'
import { getProfile, getProfileById, updateProfile, changePassword, deviceInfo, updateProfilePic } from '../controllers/UserController.js'
import upload from '../middleware/uploadProfilePic.js'

const router = express()

router.get('/getProfile/:token', getProfile)
router.get('/getProfileById/:id', getProfileById)
router.put('/updateProfile/:token', updateProfile)

router.put('/updateProfilePic/:token', upload.single('profilePic'), updateProfilePic)

router.put('/changePassword/:token', changePassword)
router.get('/deviceInfo/:token', deviceInfo)

export default router