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
  const [secretCode, setSecretCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://192.168.1.59:8000/api/signin/", {
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
    if (secretCode === 'carlospogi') {  
      setShowModal(false);
      navigate('/admin-login');
    } else {
      setCodeError('Invalid secret code');
    }
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

          <a href="#" className="forgot">Forgot Password?</a>

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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Secret Code</h3>
            <input
              type="password"
              placeholder="Secret Code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
            />
            {codeError && <p className="error">{codeError}</p>}
            <div className="modal-buttons">
              <button onClick={handleVerifyCode}>Proceed</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
