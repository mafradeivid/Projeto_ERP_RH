import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verifica se o token existe no localStorage
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
