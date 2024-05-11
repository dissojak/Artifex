import React from 'react';
import './UserProfile.css';
// Ensure the path is correct
import profileImage from '../../assets/images/Adem.jpg'; // Update the path as needed
import admin_badge from '../../assets/images/admin_badge.svg'; 

function UserProfile() {
  return (
   
          <div className="user-profile2">
      <div className="profile-image-container2">
        <img src={profileImage} style={{width:'60px',height:'60px'}} alt="Adem Ben Amor" className="profile-image2" />
      </div>
      <div className="profile-info2">
        <h1 className="profile-name2">Adem Ben Amor <img src={admin_badge} style={{width:'1em',height:'1em'}}alt="Verified" className="verified-icon2" /></h1>
        <p className="profile-description2">Outdoor photography</p>
      </div>
    </div>
  );
}

export default UserProfile;
