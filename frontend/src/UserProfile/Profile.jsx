import React, { useState } from "react";
import "./Profile.css";
import SaveIcon from "../assets/images/saveblack.svg";
import SaveIconActive from "../assets/images/savepurple.svg";
import PinIcon from "../assets/images/Pinblack.svg";
import PinIconActive from "../assets/images/Pinpurple.svg";
import OrderIcon from "../assets/images/orderblack.svg";
import OrderIconActive from "../assets/images/orderpurple.svg";
import Orders from "./Orders.jsx";
import SavedArtwork from "./SavedArtwork.jsx";
import PinnedMuseums from "./PinnedMuseums.jsx";
import Adem from "../assets/images/Adem.jpg";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const getIcon = (tabName) => {
    if (tabName === 'orders') {
      return activeTab === 'orders' ? OrderIconActive : OrderIcon;
    } else if (tabName === 'artworks') {
      return activeTab === 'artworks' ? SaveIconActive : SaveIcon;
    } else if (tabName === 'museums') {
      return activeTab === 'museums' ? PinIconActive : PinIcon;
    }
  };

  return (
    <>
    <div className="RightBacgroundProfileSvg">
      <img src="./elements/rightBackgroundProfile.svg" className="rightImage" alt="" />
    </div>
    <div className="LeftBacgroundProfileSvg">
      <img src="./elements/leftBackgroundProfile.svg" className="leftImage" alt="" />
    </div>
      <div id="Profile-section">
        <div className="Profile-section2">
            <div className="profile-cover">
            <div className="profile-image-container">
        <img src={Adem} alt="Adem Ben Amor" className="profile-image" />
      </div>
      <div className="profile-info">
        <div className="profile-name">Adem Ben Amor</div>
        <div className="profile-email">Dissojak@gmail.com</div>
      </div>
            </div>
          <div className="Buttons-section3">
            <div className="tab-container">
            <input
          type="radio"
          name="tab"
          id="tab1"
          className="tab tab--1"
          checked={activeTab === "orders"}
          onChange={() => setActiveTab("orders")}
        />
        <label className={`tab_label ${activeTab === 'orders' ? 'active' : ''}`} htmlFor="tab1">
          <img
            src={getIcon('orders')}
            style={{ width: "1.2em", height: "1.2em" }}
            alt="Order Icon"
          />
          Booking Orders
        </label>

        <input
          type="radio"
          name="tab"
          id="tab2"
          className="tab tab--2"
          checked={activeTab === "artworks"}
          onChange={() => setActiveTab("artworks")}
        />
        <label className={`tab_label ${activeTab === 'artworks' ? 'active' : ''}`} htmlFor="tab2">
          <img
            src={getIcon('artworks')}
            style={{ width: "1.2em", height: "1.2em" }}
            alt="Save Icon"
          />
          Saved Artworks
        </label>

        <input
          type="radio"
          name="tab"
          id="tab3"
          className="tab tab--3"
          checked={activeTab === "museums"}
          onChange={() => setActiveTab("museums")}
        />
        <label className={`tab_label ${activeTab === 'museums' ? 'active' : ''}`} htmlFor="tab3">
          <img
            src={getIcon('museums')}
            style={{ width: "1.2em", height: "1.2em" }}
            alt="Pin Icon"
          />
          Pinned Museums
        </label>

        <div className="indicator"></div>
            </div>
          </div>

          {/* Conditional rendering based on the selected tab */}
          {activeTab === "orders" && <Orders />}
          {activeTab === "artworks" && <SavedArtwork />}
          {activeTab === "museums" && <PinnedMuseums />}
        </div>
      </div>
    </>
  );
};

export default Profile;
