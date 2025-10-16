import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../../store/authStore';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAdminAuthStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual backend API call
      if (username === 'admin' && password === 'admin123') {
        const adminUser = {
          id: '1',
          username,
          email: 'admin@example.com',
          role: 'admin',
        };
        
        setUser(adminUser);
        navigate('/');
      } else {
        setError('Username atau password salah');
      }
    } catch (err) {
      setError('Login gagal, silahkan coba lagi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        
        <p className="demo-info">
          Demo: Username: <strong>admin</strong>, Password: <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
