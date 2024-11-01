import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UnprotectedRoute() {
  const user = useSelector(state => state.userReducer.user);
  const isAuth = user ? user.isAuth : false;
  return !isAuth ? <Outlet /> : <Navigate replace to="/" />;
}
