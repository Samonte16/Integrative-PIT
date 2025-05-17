import React, { useState } from 'react';
import '../styles/AdminAuth.css';
import { useNavigate, Link } from 'react-router-dom';

const AdminRegister = () => {
  const [fullname, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://192.168.1.59:8000/api/admin/register/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullname, gender, age, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      window.location.href = '/admin-login';
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
        <h2>Admin Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Admin Full Name" value={fullname} onChange={(e) => setFullName(e.target.value)} required />
          <input type="text" placeholder="Admin Gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
          <input type="number" placeholder="Admin Age" value={age} onChange={(e) => setAge(e.target.value)} required />
          <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Already have an account? <Link to="/admin-login">Login</Link></p>
      </div>
    </div>
  );
};

export default AdminRegister;
