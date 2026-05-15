import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function ProtectedRoute({ role, children }) {
  const { auth } = useAppContext();

  if (auth.loading) return null;
  if (!auth.user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
