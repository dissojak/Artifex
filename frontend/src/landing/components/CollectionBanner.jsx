import React from 'react';
import './CollectionBanner.css'; // Make sure the CSS file is in the same directory

const CollectionBanner = () => {
  return (
    <div className="collection-banner1">
      <div className="banner-left1"> 
        <h1 style={{margin: '133px',fontFamily:'Arial, sans-serif',fontWeight:'bold'}}>Delve Into Our Exclusive Collections!</h1>
      </div>
      <div className="banner-right1">
        <p>Discover unique collections from talented artists.</p>
        <div className="button-container">
          <button className="btn1">Start</button>
          <button className="sign-up1">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
