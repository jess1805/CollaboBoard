import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './index.module.css';
import boardContext from '../../store/board-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isUserLoggedIn, setUserLoginStatus } = useContext(boardContext);

  console.log(isUserLoggedIn);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('whiteboard_user_token', data.token);
        setUserLoginStatus(true);
        navigate('/');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

return (
  <div className={styles.loginContainer}>
    {/* Navbar */}
    <nav className={styles.navbar}>
      <div className={styles.logo}>CollaboBoard</div>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navButton}>Home</Link>
        <Link to="/about" className={styles.navButton}>About</Link>
      </div>
    </nav>

    <div className={styles.formSection}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className={styles.registerLink}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  </div>
);
};

export default Login;