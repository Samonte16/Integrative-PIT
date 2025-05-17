import React, { useState } from 'react';
import '../styles/AdminAuth.css';
import { useNavigate, Link } from 'react-router-dom';  // Import Link

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.1.59:8000/api/admin/login/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Welcome ${data.admin_name}`);
        localStorage.setItem('admin_name', data.admin_name);
        window.location.href = '/admin-dashboard';
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Don’t have an account? <Link to="/admin-register">Register</Link></p>

        <p>Back to Sign In? <Link to="/">Click Here</Link></p>
      </div>
    </div>
  );
};

export default AdminLogin;
