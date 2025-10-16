import { Navigate } from 'react-router-dom';
import { useAdminAuthStore } from '../store/authStore';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, role } = useAdminAuthStore();

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
