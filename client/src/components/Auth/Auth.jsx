import React from 'react'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'
import PublicRoute from '../../Routes/PublicRoute'
import VerifyEmail from './VerifyEmail'
import Login from './Login'
import CheckEmail from './ForgotPassword/CheckEmail'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import VerifyPasswordToken from './ForgotPassword/VerifyPasswordToken'

const Auth = () => {
    return (
        <Routes>
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='/verify/:token' element={<PublicRoute><VerifyEmail /></PublicRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/checkEmail' element={<PublicRoute><CheckEmail /></PublicRoute>} />
            <Route path='/password/:token' element={<PublicRoute><VerifyPasswordToken /></PublicRoute>} />
            <Route path='/forgotPassword' element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        </Routes>
    )
}
export default Auth