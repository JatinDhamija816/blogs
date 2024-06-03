import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import BlogRoute from './routes/BlogRoute.js'
import deviceInfo from './middleware/getDevice.js'
const app = express()

// app.use(cors({ origin: 'https://blogs-xi-six.vercel.app/', credentials: true }))
const allowedOrigins = ['https://blogs-xi-six.vercel.app/', 'https://another-allowed-origin.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(deviceInfo)

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/blog', BlogRoute)

export default app