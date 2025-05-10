import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      
      if (!auth) {
        authService.logout();
        toast.error('Please login to continue');
      }
    };

    checkAuth();
    
    // Check auth status periodically
    const interval = setInterval(checkAuth, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    // Redirect to login while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 