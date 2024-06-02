import checkPassword from '../middleware/CheckPassword.js'
import generateToken from '../utils/generateToken.js'
import sendVerifyEmail from '../utils/sendVerifyEmail.js'
import User from '../models/UserSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Activity from '../models/ActivitySchema.js'

export const register = async (req, res) => {
    try {
        const { email, fullName, username, password } = req.body

        if (!email || !fullName || !username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please Fill All Details'
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format',
            });
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            return res.status(404).json({
                success: false,
                message: 'User with this email or username already exists'
            })
        }

        const hashedPassword = await checkPassword(password)
        if (!hashedPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long',
            });
        }

        const user = new User({ email, fullName, username, password: hashedPassword })
        await user.save()

        const token = generateToken(user)
        await sendVerifyEmail({ user, Subject: 'Verify Email', purpose: 'verify', token })

        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully. Check Your Email for Verification link '
        })
    } catch (error) {
        console.error('Error in User Register Controller ', error)
        return res.status(500).json({
            success: false,
            message: 'Error in Register Module',
            error
        })
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params
        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token or token has expired.'
            })
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()
        return res.status(200).json({
            success: true,
            message: 'Email Verified Successfully'
        })
    } catch (error) {
        console.error('An error occurred during verification. Please try again later. ', error)
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                message: 'Token has expired. Please request a new verification email.'
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'An error occurred during verification. Please try again later.',
            error: error
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false, message: 'Please fill in all details.'
            })
        }
        const user = await User.findOne({
            $or: [{ username: email }, { email }]
        })
        if (!user) {
            return res.status(404).json({
                success: false, message: 'User not found.'
            })
        }
        if (!user.isVerified) {
            return res.status(403).json({
                success: false, message: 'User not verified. Check your email for verification.'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false, message: 'Invalid credentials.'
            })
        }
        const token = generateToken(user)
        const activity = new Activity({
            userId: user._id,
            deviceType: req.deviceType,
            time: req.time
        })
        await activity.save();

        return res.status(200).json({
            success: true, message: 'Login successful.',
            token
        })
    } catch (error) {
        console.error('Error in login module:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Error in Logout module', error)
        return res.status(500).json({
            success: false,
            message: 'Error in Logout module',
            error
        })
    }
}

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                succes: false,
                message: 'User not found',
            })
        }

        const token = generateToken(user)

        await user.save()
        await sendVerifyEmail({ user, Subject: 'Reset Password', purpose: 'password', token })

        return res.status(200).json({
            succes: true,
            message: 'Password reset Email sent ',
        })
    } catch (error) {
        console.error('Error in CheckEmail Module', error)
        return res.status(400).json({
            succes: false,
            message: 'Error in checkEmail module',
            error
        })
    }
}

export const verifyPasswordToken = async (req, res) => {
    try {
        const { token } = req.params

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token or token has expired.'
            })
        }

        await user.save()
        return res.status(200).json({
            success: true,
            message: 'Email Verified Successfully',
            token
        })
    } catch (error) {
        console.error('Error in verify Password Token', error)
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                message: 'Token has expired. Please request a new verification email.'
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'An error occurred during verification of Password Token. Please try again later.',
            error
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword, confirmPassword } = req.body

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false, message: 'New Password and Confirm Password are not match'
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const user = await User.findById(userId)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        user.resetPasswordExpires = undefined
        user.resetPasswordToken = undefined

        await user.save()
        res.cookie('verifyPassword', '', {
            expires: new Date(0),
            httpOnly: true
        });
        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error('Error in Reset Password Module', error)
        return res.status(404).json({
            success: false,
            message: 'Error in Reset Password Module',
            error
        })
    }
}