import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { usePocket } from '../contexts/PocketContext';

export const RequireAuth = () => {
  const { user } = usePocket();
  const location = useLocation();

  if (!user) {
    return <Navigate to={{ pathname: '/', state: { from: location } }} />;
  }
  return <Outlet />;
};
