import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../state/authStore';
import Loading from './Loading';
import { useAuth } from '@clerk/clerk-react';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const location = useLocation();

  if (!isLoaded) {
    return <Loading fullScreen />;
  }

  if (!isSignedIn || !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
