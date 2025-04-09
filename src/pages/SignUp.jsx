import React, { useState } from 'react';
import '../styles/SignUp.css';
import GoogleLogo from '../img/google-logo.png';
import FBLogo from '../img/fb-logo.png';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  // State to toggle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-form-box">
          <h3 className="form-heading">Create Account</h3>
          <form className="form-body">
            <input type="text" placeholder="Full Name" className="form-input" />
            <div className="form-row">
              <select className="form-input half">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="number" placeholder="Age" className="form-input half" />
            </div>
            <input type="number" placeholder="Phone Number" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <div className="password-wrapper">
              <input 
                type={passwordVisible ? "text" : "password"} 
                placeholder="Password" 
                className="form-input" 
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>👁️</span>
            </div>
            <div className="terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">terms of service and privacy policy</a>.
              </label>
            </div>
            <button type="submit" className="submit-btn">Sign Up</button>
            <div className="or">──────────── Or Continue with ────────────</div>
            <div className="socials">
            <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer">
              <button className="fb">
                <img src={FBLogo} alt="Facebook" />
              </button>
            </a>
            <a href="https://accounts.google.com/ServiceLogin" target="_blank" rel="noopener noreferrer">
              <button className="google">
                <img src={GoogleLogo} alt="Google" />
              </button>
            </a>
          </div>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/">Sign In Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
