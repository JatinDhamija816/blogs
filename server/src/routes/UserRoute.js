import express from 'express'
import { getProfile, updateProfile, changePassword, deviceInfo } from '../controllers/UserController.js'

const router = express()

router.get('/getProfile/:token', getProfile)
router.put('/updateProfile/:token', updateProfile)
router.put('/changePassword/:token', changePassword)
router.get('/deviceInfo/:token', deviceInfo)

export default router