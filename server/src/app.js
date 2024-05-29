import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import deviceInfo from './middleware/getDevice.js'
const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(deviceInfo)

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)

export default app