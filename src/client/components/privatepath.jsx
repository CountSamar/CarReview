import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
