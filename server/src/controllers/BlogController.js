import jwt from 'jsonwebtoken'
import Blog from '../models/blogSchema.js'
import User from '../models/UserSchema.js'

export const createBlog = async (req, res) => {
    try {
        const { token } = req.params
        const { title, content } = req.body

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and Content are required'
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Token'
            })
        }
        const userId = decodedToken.id
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const blog = new Blog({ title, content, author: user._id })
        await blog.save()

        return res.status(201).json({
            success: true,
            message: 'Blog Created Successfull',
            blog
        })
    } catch (error) {
        console.error('Error in createBlog Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error While Creating Blog',
            error: error.message
        })
    }
}

export const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username')

        return res.status(200).json({
            success: true,
            message: 'All  Blogs',
            blogs
        })
    } catch (error) {
        console.error('Error in Get All blogs controller', error)

        return res.status(500).json({
            success: false,
            message: 'Error in getAllBlogs',
            error
        })
    }
}

export const getBlogByUser = async (req, res) => {
    try {
        const { token } = req.params
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const userId = decodedToken.id
        const blog = await Blog.find({ author: userId }).populate('author', 'username')
        return res.status(200).json({
            success: true,
            message: 'Blogs by user',
            blog
        })
    } catch (error) {
        console.error('Error in GetBlog By User Module', error)
        return res.status(500).json({
            success: false,
            message: 'Error in Get blog by user module',
            error
        })
    }
}