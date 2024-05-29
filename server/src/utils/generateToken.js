import jwt from 'jsonwebtoken'

function generateToken(user) {
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token
}
export default generateToken