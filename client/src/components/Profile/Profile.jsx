import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../Routes/ProtectedRoute'
import Home from './Home'
import Navbar from '../Common/Navbar'
import UserProfile from './UserProfile'
import ChangePassword from './ChangePassword'
import DeviceInfo from './DeviceInfo'
import UpdateProfile from './UpdateProfile/UpdateProfile'
import UserBlogs from './UserBlogs'

const Profile = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='/userProfile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path='/updateProfile' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                <Route path='/changePassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                <Route path='/deviceInfo' element={<ProtectedRoute><DeviceInfo /></ProtectedRoute>} />
                <Route path='/userBlogs' element={<ProtectedRoute><UserBlogs /></ProtectedRoute>} />
            </Routes>
        </div>
    )
}
export default Profile