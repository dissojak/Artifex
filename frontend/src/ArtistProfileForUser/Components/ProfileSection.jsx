import React, { useState } from "react";
import "./ProfileSection.css";
import OrderSection from "./OrderSection.jsx";
import ArtworksSection from "./ArtworksSection.jsx";
import Adem from "../../assets/images/Adem.jpg";
import Logo from "../../assets/images/logo.svg";

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState('artworks'); // Default to artworks tab

  return (
    <>
      <div id="ArtistProfileUser-section">
        <div className="profile-Banner"></div>
        <div className="profile-container7">
          <img className="profile-image7" src={Adem} alt="Artist Image" />
          <h1 className="profile-name7">Adem Ben Amor</h1>
          <p className="profile-details7" style={{ fontSize: '12px', color: '#9866FF', fontWeight: 'bold' }}>
            <img src={Logo} alt="logo" /> Artist
          </p>
          <p className="profile-details7">245 Subscribers • 12 Artworks</p>
          <p className="profile-details7" style={{ fontSize: '12px', color: '#9866FF' }}>Digital Drawing</p>
          <button className="Btn7">
            <p className="text7">Subscribe</p>
            <span className="effect7"></span>
          </button>
        </div>
        <div className="Buttonart-order-section">
          <br />
          <div className="tab-container7">
            <input type="radio" name="tab" id="tab1" className="tab7 tab--17" checked={activeTab === 'artworks'} onChange={() => setActiveTab('artworks')} />
            <label className="tab_label7" htmlFor="tab1">Artworks</label>

            <input type="radio" name="tab" id="tab2" className="tab7 tab--27" checked={activeTab === 'orders'} onChange={() => setActiveTab('orders')} />
            <label className="tab_label7" htmlFor="tab2">Order</label>

            <div className="indicator7"></div>
          </div>
        </div>
        {/* Conditionally render sections based on activeTab */}
        {activeTab === 'orders' && <OrderSection />}
        {activeTab === 'artworks' && <ArtworksSection />}
      </div>
    </>
  );
};

export default ProfileSection;
