import React from 'react';
import { Navigate } from 'react-router-dom';

const RutasProtegidas = ({ isAuthenticated, children }) => {
  const userRole = localStorage.getItem('userRole');

  // Solo permitir si está autenticado Y es admin
  if (isAuthenticated && userRole === 'admin') {
    return children;
  }

  // Si es cliente o no autenticado, redirigir a la tienda
  return <Navigate to="/productos" />;
};

export default RutasProtegidas;
