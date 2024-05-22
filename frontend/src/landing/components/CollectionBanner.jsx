import React from 'react';
import './CollectionBanner.css'; // Make sure the CSS file is in the same directory
import { Link } from "react-router-dom";
const CollectionBanner = () => {
  return (
    <div className="collection-banner1">
      <div className="banner-left1"> 
        <h1 style={{margin: '133px',fontFamily:'Dubai-Bold'}}>Delve Into Our Exclusive Collections!</h1>
      </div>
      <div className="banner-right1">
        <p>Discover unique collections from talented artists.</p>
        <div className="button-container">
        <Link to="/login"><button className="btn1">Start</button></Link>
          <Link to="/signup"><button className="sign-up1">Sign up</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
