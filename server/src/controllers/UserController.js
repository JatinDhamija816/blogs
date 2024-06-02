import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import checkPassword from '../middleware/CheckPassword.js'
import User from '../models/UserSchema.js';
import Activity from '../models/ActivitySchema.js'

export const getProfile = async (req, res) => {
    try {
        const { token } = req.params
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodedToken.id;
        const user = await User.findById(userId);

        return res.status(200).json({
            succes: true,
            message: 'User Profile',
            user
        })
    } catch (error) {
        console.error('Error in getProfile Module', error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { token } = req.params
        const { email, fullName, username } = req.body

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const updateFields = {};
        if (email) updateFields.email = email;
        if (fullName) updateFields.fullName = fullName;
        if (username) updateFields.username = username;

        await User.findByIdAndUpdate(userId, updateFields, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error('Error in UpdateProfile Controller', error)
        return res.status(404).json({
            success: false,
            message: 'Error in updateProfile Module',
            error
        })
    }
}

export const updateProfilePic = async (req, res) => {
    try {
        const { token } = req.params
        const path = req.file.path

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const user = await User.findById(userId);
        user.profilePic = path;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile Picture updated successfully',
        });
    } catch (error) {
        console.error('Error in UpdateProfilePic Controller', error)
        return res.status(404).json({
            success: false,
            message: 'Error in updateProfilePic Module',
            error
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { token } = req.params
        const { currentPassword, newPassword, confirmPassword } = req.body

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false, message: 'New password and confirm password do not match'
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const user = await User.findById(userId)
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false, message: 'Current Password is incorrect'
            })
        }

        const hashedPassword = await checkPassword(newPassword)
        if (!hashedPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long',
            });
        }
        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error('Error in Change password Controller ', error)
        return res.status(404).json({
            success: false,
            message: 'Error in Change Password Module',
            error
        })
    }
}

export const deviceInfo = async (req, res) => {
    try {
        const { token } = req.params
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodedToken.id;
        const activity = await Activity.find({ userId })

        return res.status(200).json({
            success: true,
            message: "All Activity of User",
            activity
        })
    } catch (error) {
        console.error('Error in Device Info Controller', error)
        return res.status(500).json({
            success: false,
            message: "Error in Device Info Controller",
            error
        })
    }
}