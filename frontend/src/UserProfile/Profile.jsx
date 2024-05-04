import React, { useState } from "react";
import "./Profile.css";
import SaveIcon from "../assets/images/save.svg";
import PinIcon from "../assets/images/Pin.svg";
import OrderIcon from "../assets/images/order.svg";
import Orders from "./Orders.jsx";
import SavedArtwork from "./SavedArtwork.jsx";
import PinnedMuseums from "./PinnedMuseums.jsx";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <>
      <div id="Profile-section">
        <div className="Profile-section2">
          <div className="Buttons-section3">
            <div className="tab-container">
              <input type="radio" name="tab" id="tab1" className="tab tab--1" checked={activeTab === 'orders'} onChange={() => setActiveTab('orders')} />
              <label className="tab_label" htmlFor="tab1">
                <img src={OrderIcon} style={{width:'1.2em', height:'1.2em'}} alt="Order Icon"/>Booking Orders
              </label>

              <input type="radio" name="tab" id="tab2" className="tab tab--2" checked={activeTab === 'artworks'} onChange={() => setActiveTab('artworks')} />
              <label className="tab_label" htmlFor="tab2">
                <img src={SaveIcon} style={{width:'1.2em', height:'1.2em'}} alt="Save Icon"/>Saved Artworks
              </label>

              <input type="radio" name="tab" id="tab3" className="tab tab--3" checked={activeTab === 'museums'} onChange={() => setActiveTab('museums')} />
              <label className="tab_label" htmlFor="tab3">
                <img src={PinIcon} style={{width:'1.2em', height:'1.2em'}} alt="Pin Icon"/>Pinned Museums
              </label>

              <div className="indicator"></div>
            </div>
          </div>

          {/* Conditional rendering based on the selected tab */}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'artworks' && <SavedArtwork />}
          {activeTab === 'museums' && <PinnedMuseums />}
        </div>
      </div>
    </>
  );
};

export default Profile;
