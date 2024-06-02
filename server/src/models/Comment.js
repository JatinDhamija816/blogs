import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        requiree: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, { timestamps: true })

const Comment = new mongoose.model('Comment', commentSchema)

export default Comment