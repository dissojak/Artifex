import React, { useState } from "react";
import "./Showcase.css";
const Showcase = () => {

  return (
    <>
      <div id="ShowcaseMus-section">
      <div className="ShowcaseMus-Banner"></div>
        <div className="profile-container7">
          <img className="profile-image7" src={Adem} alt="Artist Image" />
          <h1 className="profile-name7">Adem Ben Amor</h1>
          <p className="profile-details7" style={{ fontSize: '12px', color: '#9866FF',fontFamily:'Raleway-SemiBold' }}>
            <img src={Logo} alt="logo" /> Artist
          </p>
          <p className="profile-details7">245 Subscribers • 12 Artworks</p>
          <p className="profile-details7" style={{ fontSize: '12px', color: '#9866FF' }}>Digital Drawing</p>
          <button className="Btn7">
            <p className="text7">Subscribe</p>
            <span className="effect7"></span>
          </button>
        </div>
       
      </div>
    </>
  );
};

export default Showcase;
