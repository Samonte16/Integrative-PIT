// src/components/Dashboard.js
import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [selectedShift, setSelectedShift] = useState('');
  const [clockInReason, setClockInReason] = useState('');
  const [clockLog, setClockLog] = useState([]);
  const [clockedInTime, setClockedInTime] = useState(null);

  const handleClockIn = (e) => {
    e.preventDefault();
    if (!selectedShift) return alert("Please select a shift.");

    const now = new Date();
    const todayDate = now.toDateString();

    const alreadyClockedInToday = clockLog.some(
      (entry) => entry.type === 'in' && new Date(entry.time).toDateString() === todayDate
    );

    if (alreadyClockedInToday) {
      return alert("You have already clocked in today.");
    }

    const timestamp = now.toLocaleString();
    setClockedInTime(now);
    setClockLog((prev) => [
      ...prev,
      {
        type: 'in',
        time: timestamp,
        shift: selectedShift,
        reason: clockInReason,
      },
    ]);
    setClockInReason('');
    alert(`Clocked in for ${selectedShift}.\nReason: ${clockInReason}`);
  };

  const handleClockOut = () => {
    if (!clockedInTime) {
      alert('You must clock in before clocking out.');
      return;
    }
    const now = new Date();
    const timestamp = now.toLocaleString();
    const duration = Math.floor((now - clockedInTime) / 60000); // duration in minutes
    const durationText = `${Math.floor(duration / 60)}h ${duration % 60}m`;
    setClockLog((prev) => [
      ...prev,
      {
        type: 'out',
        time: timestamp,
        duration: durationText,
      },
    ]);
    setClockedInTime(null);
    alert(`Clocked out. Duration: ${durationText}`);
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
            <input type="text" placeholder="Search in site" className="search" aria-label="Search" />
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
          <button type="submit" className="btn-primary">Clock In</button>
          <button
            type="button"
            className="btn-primary clockout-button"
            onClick={handleClockOut}
          >
            Clock Out
          </button>
        </form>
      </section>

      {/* Clock Log Section */}
      <section className="clock-log">
        <h3>Clock Log</h3>
        {clockLog.length === 0 ? (
          <p>No clock activity yet.</p>
        ) : (
          <ul className="log-list">
            {clockLog.map((entry, index) => (
              <li key={index} className={`log-entry ${entry.type === 'in' ? 'log-in' : 'log-out'}`}>
                <span className="log-icon">{entry.type === 'in' ? '🟢' : '🔴'}</span>
                <div>
                  <strong>{entry.type === 'in' ? 'Clocked In' : 'Clocked Out'}</strong>
                  <div>{entry.time}</div>
                  {entry.shift && <div><em>Shift: {entry.shift}</em></div>}
                  {entry.reason && <div>Reason: {entry.reason}</div>}
                  {entry.duration && (
                    <div className="log-duration">
                      Duration: <strong>{entry.duration}</strong>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>


      {/* Footer */}
      <footer>
        <a href="/Contact">Contact Us</a>
        <a href="/About">About</a>
        <a href="/Terms">Terms and Conditions</a>
      </footer>

      {/* Logout Button */}
      <button className="btn-logout" onClick={handleLogout}><a href="/">LogOut</a></button>
    </div>
  );
};

export default Dashboard;
