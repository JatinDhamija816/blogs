import React from 'react'
import Navbar from '../Common/Navbar'
import { Route, Routes } from 'react-router-dom'
import CreateBlog from './CreateBlog'
import ProtectedRoute from '../../Routes/ProtectedRoute'
import Home from './Home'
import ReadBlog from './ReadBlog'

const Blog = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/createBlog' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            </Routes>
        </div>
    )
}

export default Blog
