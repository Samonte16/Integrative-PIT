import React, { useState } from 'react';
import '../styles/SignIn.css';
import OnlyFriendsLogo from '../img/OnlyFriends-logo.png';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const [forgotOldPasswordVisible, setForgotOldPasswordVisible] = useState(false);
  const [forgotNewPasswordVisible, setForgotNewPasswordVisible] = useState(false);
  const [secretCodeVisible, setSecretCodeVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://192.168.1.44:8000/api/signin/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setIsLoading(false);
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleVerifyCode = () => {
    if (secretCode === 'ADMINSONLY') {
      setShowModal(false);
      navigate('/admin-login');
    } else {
      setCodeError('Invalid secret code');
    }
  };

  const resetForgotForm = () => {
    setForgotEmail("");
    setOldPassword("");
    setNewPassword("");
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(false);
    setForgotOldPasswordVisible(false);
    setForgotNewPasswordVisible(false);
  };

  const handleForgotPassword = async () => {
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);

    if (!forgotEmail || !oldPassword || !newPassword) {
      setForgotError("All fields are required.");
      setForgotLoading(false);
      return;
    }

    try {
      const response = await fetch("http://192.168.1.44:8000/api/forgot-password/", {
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
        setForgotSuccess("Password changed successfully. You may now sign in.");
        setTimeout(() => {
          resetForgotForm();
          setShowForgotModal(false);
        }, 1500);
      } else {
        setForgotError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      setForgotError("Something went wrong.");
    }

    setForgotLoading(false);
  };

  const handleCancelForgot = () => {
    resetForgotForm();
    setShowForgotModal(false);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1 className="logo">
          <span className="only">Only</span>
          <span className="friends">Friends</span>
        </h1>
        <div className="logo-img">
          <img src={OnlyFriendsLogo} alt="OnlyFriends Logo" />
        </div>
      </div>

      <div className="right-panel">
        <h2>Hello!<br />Welcome Back</h2>
        <p>Please Sign In to Continue.</p>

        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
            >
              👁️
            </span>
          </div>

          <a href="#" className="forgot" onClick={() => setShowForgotModal(true)}>Forgot Password?</a>

          <button type="submit" className="signin-btn" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {error && <p className="error">{error}</p>}

          <p className="signup">
            Don’t have an account? <Link to="/signup">Sign Up Here</Link>
          </p>

          <p className="admin-auth">
            Are you an Admin?
            <a href="#" className="admin-link" onClick={handleAdminClick}> Click Here</a>
          </p>
        </form>
      </div>

      {/* Admin Secret Code Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <h3>Enter Secret Code</h3>
            <div className="password-wrapper">
              <input
                type={secretCodeVisible ? "text" : "password"}
                placeholder="Secret Code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
              />
              <span
                className="eye-icon"
                onClick={() => setSecretCodeVisible(!secretCodeVisible)}
              >
                👁️
              </span>
            </div>
            {codeError && <p className="admin-error">{codeError}</p>}
            <div className="admin-modal-buttons">
              <button onClick={handleVerifyCode}>Proceed</button>
              <button className="admin-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Forgot Password</h3>
            <input
              type="email"
              placeholder="Your Verified Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <div className="password-wrapper">
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
            <div className="password-wrapper">
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
            {forgotError && <p className="error">{forgotError}</p>}
            {forgotSuccess && <p className="success">{forgotSuccess}</p>}
            <div className="modal-buttons">
              <button onClick={handleForgotPassword} disabled={forgotLoading}>
                {forgotLoading ? "Changing..." : "Change Password"}
              </button>
              <button className="cancel-btn" onClick={handleCancelForgot}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
