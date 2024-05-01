import React from 'react';
import './DiscoverBanner.css'; // Make sure the CSS file is in the same directory

const DiscoverBanner = () => {
  return (
    <div className="Discover-banner1">
      <div className="banner-left1"> 
        <h1 style={{margin: '133px',fontFamily:'Arial, sans-serif',fontWeight:'bold'}}>Discover Unique Artwork For Sale.</h1>
      </div>
      <div className="banner-right1">
        <p>Explore a diverse collection of artwork from talented artists around the world.</p>
        <div className="button-container">
          <button className="btn1">Start</button>
          <button className="sign-up2">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverBanner;
