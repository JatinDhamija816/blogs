import nodemailer from 'nodemailer'
import User from '../models/UserSchema.js';

const sendVerifyEmail = async ({ user, Subject, purpose, token }) => {
    try {
        const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD, FRONTEND_URL } = process.env;
        const transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            host: "smtp.gmail.com",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            }
        })
        const url = `${FRONTEND_URL}/${purpose}/${token}`;

        const tokenExpiry = Date.now() + 3600000

        if (purpose === 'verify') {
            await User.findByIdAndUpdate(user._id, { verifyToken: token, verifyTokenExpiry: tokenExpiry })
        } else if (purpose === 'password') {
            await User.findByIdAndUpdate(user._id, {
                resetPasswordToken: token, resetPasswordExpires: tokenExpiry
            })
        }
        const mailOptions = {
            from: EMAIL_USER,
            to: user.email,
            subject: Subject,
            html: `Click <a href="${url}">here</a> for ${purpose === 'verify' ? "verify your email" : "reset your password"} <br> or click here ${url}.`
        }
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error) {
        throw new Error('Failed to send Email', error.message)
    }
}
export default sendVerifyEmail