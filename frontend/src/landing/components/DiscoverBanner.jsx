import React from 'react';
import './DiscoverBanner.css'; // Make sure the CSS file is in the same directory
import { Link } from "react-router-dom";
const DiscoverBanner = () => {
  return (
    <div className="Discover-banner1">
      <div className="banner-left1"> 
        <h1 style={{margin: '133px',fontFamily:'Dubai-Bold'}}>Discover Unique Artwork For Sale.</h1>
      </div>
      <div className="banner-right1">
        <p>Explore a diverse collection of artwork from talented artists around the world.</p>
        <div className="button-container">
        <Link to="/login"><button className="btn1">Start</button></Link>
        <Link to="/signup"><button className="sign-up2">Sign up</button></Link>
        </div>
      </div>
    </div>
  );
};

export default DiscoverBanner;
