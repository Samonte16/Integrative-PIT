import React, { useState } from 'react';
import '../styles/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch("https://ipt-pit-django-v2.onrender.com/api/signup/",  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          gender,
          age,
          phone,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Signup successful! Please verify your email.');
        navigate('/');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-form-box">
          <h3 className="form-heading">Create Account</h3>
          <form className="form-body" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <div className="form-row">
              <select
                className="form-input half"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="number"
                placeholder="Age"
                className="form-input half"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <input
              type="number"
              placeholder="Phone Number"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-wrapper">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="signup-eye-icon" onClick={togglePasswordVisibility}>👁️</span>
            </div>
            <div className="terms">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <a href="/Terms">Terms and Conditions</a>.
              </label>
            </div>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>

            {error && <p className="error">{error}</p>}
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
