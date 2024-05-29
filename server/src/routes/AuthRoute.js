import express from 'express'
import { register, verifyEmail, login, logout, checkEmail, verifyPasswordToken, forgotPassword } from '../controllers/AuthController.js'

const router = express()

router.post('/register', register)
router.get('/verify/:token', verifyEmail)
router.post('/login', login)
router.post('/logout', logout)
router.post('/checkEmail', checkEmail)
router.get('/verifyPassword/:token', verifyPasswordToken)
router.put('/forgotPassword/:token', forgotPassword)

export default router