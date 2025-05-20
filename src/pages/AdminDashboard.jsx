import React, { useEffect, useState } from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState(localStorage.getItem('admin_name'));

  // ✅ Check on mount if admin is logged in
  useEffect(() => {
    if (!adminName) {
      window.location.href = '/admin-login';
    }
  }, [adminName]);

  // ✅ Fetch users
  useEffect(() => {
    fetch('https://ipt-pit-django-v2.onrender.com/api/admin/verified-users/')
      .then(res => res.json())
      .then(data => setUsers(data.verified_users))
      .catch(() => alert('Failed to fetch verified users'));
  }, []);

  // ✅ Auto-logout across tabs using 'storage' event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'adminname' && e.newValue === null) {
        // 👇 reload page to trigger login redirect
        window.location.href = '/admin-login';
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // ✅ Manual logout (this tab) and auto-redirect
  const handleLogout = () => {
    localStorage.removeItem('admin_name');
    alert('You have logged out.');
    window.location.href = '/admin-login'; // works in all environments
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
