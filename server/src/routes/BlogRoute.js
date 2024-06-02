import express from 'express'
import { createBlog, getAllBlog, getBlogByUser } from '../controllers/BlogController.js'

const router = express()

router.post('/createBlog/:token', createBlog)
router.get('/getAllBlog', getAllBlog)
router.get('/getBlogByUser/:token', getBlogByUser)

export default router