import React, { useState } from 'react';
import '../styles/AdminAuth.css';
import { Link } from 'react-router-dom';

const AdminRegister = () => {
  const [fullname, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Replace this with actual API call
    alert(`Registered admin: 
    Name: ${fullname}
    Gender: ${gender}
    Age: ${age}
    Email: ${email}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Admin Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Admin Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Admin Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/admin-login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
