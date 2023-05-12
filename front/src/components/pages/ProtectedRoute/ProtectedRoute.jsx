import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute() {
  const isAuth = useSelector((state) => state.userReducer.user.isAuth);
  return (
    isAuth ? <Outlet /> : <Navigate to="/auth/login" />
  );
}
