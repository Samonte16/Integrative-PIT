import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const adminName = localStorage.getItem('admin_name');
      
  useEffect(() => {
    fetch('https://ipt-pit-django-v2.onrender.com/api/admin/verified-users/')
      .then(res => res.json())
      .then(data => setUsers(data.verified_users))
      .catch(() => alert('Failed to fetch verified users'));
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'admin_name' && e.newValue === null) {
        navigate('/admin-login');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('admin_name');
    alert('You have logged out.');
    navigate('/admin-login');
  };

  return (
    <div className="admin-page-wrapper">
      <nav className="admin-avbar">
        <h3>Welcome, {adminName}</h3>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="admin-dashboard-container">
        <h2>Verified Users</h2>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
