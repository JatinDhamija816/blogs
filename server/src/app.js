import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import BlogRoute from './routes/BlogRoute.js'
import deviceInfo from './middleware/getDevice.js'
const app = express()

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.use(deviceInfo)

app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/blog', BlogRoute)

export default app