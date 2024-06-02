import React from 'react'
import Navbar from '../Common/Navbar'

import { Route, Routes } from 'react-router-dom'
import CreateBlog from './CreateBlog'
import ProtectedRoute from '../../Routes/ProtectedRoute'
import Home from './Home'

const Blog = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/createBlog' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
                {/* <Route path='/createBlog' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
                <Route path='/updateProfile' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                <Route path='/changePassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                <Route path='/deviceInfo' element={<ProtectedRoute><DeviceInfo /></ProtectedRoute>} /> */}
            </Routes>
        </div>
    )
}

export default Blog
