// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifie la présence du token

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
