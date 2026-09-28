import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router';


const PublicProtected = () => {

  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

export default PublicProtected;
