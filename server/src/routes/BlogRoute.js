import express from 'express'
import { createBlog, getAllBlog, getBlogByUser, getBlogById, updateBlog, deleteBlog } from '../controllers/BlogController.js'
import upload from '../middleware/BlogImage.js'

const router = express()
router.post('/createBlog/:token', upload.single('image'), createBlog)

router.get('/getAllBlog', getAllBlog)
router.get('/getBlogByUser/:token', getBlogByUser)
router.get('/getBlogById/:id', getBlogById)

router.put('/updateBlogById/:id', updateBlog)
router.delete('/deleteBlog/:id', deleteBlog)

export default router