import React from 'react';
import {
  Routes, Route, Outlet, BrowserRouter
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/pages/Home/Home';
import { useLazyComponent } from './hooks/useLazyComponent';
import { checkAuth } from './redux/slices/userSlice';
import ProtectedRoute from './components/pages/ProtectedRoute/ProtectedRoute';
import UnprotectedRoute from './components/pages/UnprotectedRoute/UnprotectedRoute';

export const HeaderAuthLazy = useLazyComponent(() => import('./components/elements/HeaderAuth/HeaderAuth'));
export const LoginLazy = useLazyComponent(() => import('./components/pages/Login/Login'));
const EmailActivationLazy = useLazyComponent(() => import('./components/pages/EmailActivation/EmailActivation'));
const RegistrationLazy = useLazyComponent(() => import('./components/pages/Registration/Registration'));
const NotFoundLazy = useLazyComponent(() => import('./components/pages/NotFound/NotFound'));

export default function AppRoutes() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: implement Header component in some pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<UnprotectedRoute />}>
          <Route
            path="/auth"
            element={(
              <>
                <HeaderAuthLazy />
                <Outlet />
              </>
            )}
          >
            <Route path="login" element={<LoginLazy />} />
            <Route path="registration" element={<RegistrationLazy />} />
          </Route>
        </Route>
        <Route path="email-activation" element={<EmailActivationLazy />} />
        <Route path="*" element={<NotFoundLazy />} />
      </Routes>
    </BrowserRouter>
  );
}
