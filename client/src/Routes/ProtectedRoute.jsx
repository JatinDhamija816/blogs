import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './Auth';

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/home" replace />;
    }
    return children;
};

export default ProtectedRoute;
