// src/components/Dashboard.js
import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [selectedShift, setSelectedShift] = useState('');
  const [clockInReason, setClockInReason] = useState('');

  const handleClockIn = (e) => {
    e.preventDefault();
    alert(`Clocked in for ${selectedShift}.\nReason: ${clockInReason}`);
  };

  const handleLogout = () => {
    alert('You have logged out.');
    // Add logic for logging out (e.g., clearing user data or redirecting to login page)
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="dash-logo">Clock-In Dashboard</h2>
        <div className="nav-right">
          <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search in site" className="search" aria-label="Search"/>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="profile-pic" />
        <div>
          <h3>Employee Name</h3>
          <p>Basic Employee</p>
          <p>Welcome to the Clock-in Dashboard</p>
        </div>
        <div className="welcome-actions">
          <button className="btn-secondary">Upcoming Schedules</button>
          <button className="btn-primary">Clock In</button>
        </div>
      </div>

      {/* Upcoming Schedules */}
      <section className="schedules">
        <h3>Upcoming Schedules</h3>
        <p>View your upcoming work shifts</p>
        <div className="shift-list">
          <div className="shift-item">
            <span className="shift-icon">🕒</span>
            <div>
              <strong>Shift Date</strong> <br />
              Monday, May 10
            </div>
            <div className="shift-time">9:00 AM - 5:00 PM</div>
          </div>
          <div className="shift-item">
            <span className="shift-icon">🕒</span>
            <div>
              <strong>Shift Date</strong> <br />
              Wednesday, May 12
            </div>
            <div className="shift-time">1:00 PM - 9:00 PM</div>
          </div>
        </div>
      </section>

      {/* Clock In Form */}
      <section className="clockin-form">
        <h3>Clock In</h3>
        <p>Select your shift and clock in</p>
        <form onSubmit={handleClockIn}>
          <div className="shift-buttons">
            <button
              type="button"
              onClick={() => setSelectedShift('Monday, May 10 - 9:00 AM')}
              className={selectedShift.includes('Monday') ? 'active' : ''}
            >
              Monday, May 10 - 9:00 AM
            </button>
            <button
              type="button"
              onClick={() => setSelectedShift('Wednesday, May 12 - 1:00 PM')}
              className={selectedShift.includes('Wednesday') ? 'active' : ''}
            >
              Wednesday, May 12 - 1:00 PM
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter a reason for clocking in"
            value={clockInReason}
            onChange={(e) => setClockInReason(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Confirm Clock In</button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <a href="/Contact">Contact Us</a>
        <a href="/About">About</a>
        <a href="/Terms">Terms and Conditions</a>
      </footer>

      {/* Logout Button at the bottom-right */}
      <button className="btn-logout" onClick={handleLogout}><a href="/">LogOut</a></button>
    </div>
  );
};

export default Dashboard;
