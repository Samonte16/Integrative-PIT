import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profile-details">
        <div className="profile-pic" />
        <div className="profile-info">
          <h3>Employee Name</h3>
          <p>Basic Employee</p>
          <p>Email: employee@example.com</p>
          <p>Department: HR</p>
        </div>
      </div>
      <button className="btn-primary">Edit Profile</button>
    </div>
  );
};

export default Profile;
