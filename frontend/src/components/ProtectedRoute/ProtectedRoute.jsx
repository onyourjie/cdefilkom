import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ProtectedRoute = ({ children, requiredRole = 'user' }) => {
  const { isAuthenticated, role } = useAuthStore();
  const roleHierarchy = { guest: 0, user: 1, admin: 2 };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roleHierarchy[role] < roleHierarchy[requiredRole]) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
};

export default ProtectedRoute;
