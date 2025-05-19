import React, { useState } from 'react';
import '../styles/AdminAuth.css';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotOldPasswordVisible, setForgotOldPasswordVisible] = useState(false);
  const [forgotNewPasswordVisible, setForgotNewPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.44:8000/api/admin/login/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Welcome ${data.admin_name}`);
        localStorage.setItem('admin_name', data.admin_name);
        navigate('/admin-dashboard');
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleForgotPassword = async () => {
    setForgotError("");
    setForgotSuccess("");

    if (!forgotEmail || !oldPassword || !newPassword) {
      setForgotError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.44:8000/api/admin-forgot-password/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          old_password: oldPassword,
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setForgotSuccess("Password changed successfully. You may now log in.");
        setForgotEmail("");
        setOldPassword("");
        setNewPassword("");
      } else {
        setForgotError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setForgotError("Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="admin-password-wrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="admin-eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              👁️
            </span>
          </div>
          <a href="#" className="forgot" onClick={() => setShowForgotModal(true)}>Forgot Password?</a>
          <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Don’t have an account? <Link to="/admin-register">Register</Link></p>
        <p>Back to Sign In? <Link to="/">Click Here</Link></p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3>Forgot Password</h3>
            <input
              type="email"
              placeholder="Your Verified Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <div className="admin-password-wrapper">
              <input
                type={forgotOldPasswordVisible ? "text" : "password"}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setForgotOldPasswordVisible(!forgotOldPasswordVisible)}
              >
                👁️
              </span>
            </div>
            <div className="admin-password-wrapper">
              <input
                type={forgotNewPasswordVisible ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setForgotNewPasswordVisible(!forgotNewPasswordVisible)}
              >
                👁️
              </span>
            </div>
            {forgotError && <p className="admin-error">{forgotError}</p>}
            {forgotSuccess && <p className="admin-success">{forgotSuccess}</p>}
            <div className="admin-modal-buttons">
              <button onClick={handleForgotPassword}>Change Password</button>
              <button className="admin-cancel-btn" onClick={() => setShowForgotModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
