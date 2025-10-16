import { useLocation } from 'react-router-dom';

export const useRoleFromURL = () => {
  const location = useLocation();
  
  // Cek apakah user di halaman admin atau client
  const isAdminPage = location.pathname.startsWith('/admin');
  const role = isAdminPage ? 'admin' : 'user';
  
  return { role, isAdminPage };
};
