import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authAPI } from '../../services/api';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authAPI.isAuthenticated();

  if (!isAuthenticated) {
    // Store the current location to redirect back after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 