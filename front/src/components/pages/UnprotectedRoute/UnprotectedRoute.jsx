import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UnprotectedRoute() {
  const isAuth = useSelector((state) => state.userReducer.user.isAuth);
  return (
    !isAuth ? <Outlet /> : <Navigate replace to="/" />
  );
}
