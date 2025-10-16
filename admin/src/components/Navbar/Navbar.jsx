import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/authStore';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAdminAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="Logo" />
        <div className='navbar-right'>
          <span className='admin-name'>{user?.username || 'Admin'}</span>
          <img className='profile' src={assets.profile_image} alt="Profile" />
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default Navbar;
