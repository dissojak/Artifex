import React, {  } from "react";
import "./OpenOrderArtist.css";
// import Adem from "../../assets/images/Adem.png";
import { useSelector } from "react-redux";
const OpenOrderArtist = () => {
    const { userInfo } = useSelector((state) => state.auth);


  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
 
  <div className="price-settingOpenOrderArtist">
  <div className="header-contentOpenOrderArtist">
    <img src={userInfo.image} alt="Profile" className="profile-imageOpenOrderArtist"/>
    <h2>Accept Orders From Clients</h2>
  </div>
  <p>What's prices are suitable for you?</p>
  <div className="prices-formOpenOrderArtist">
    <div>
      <label htmlFor="normalPrice">Normal Price:</label>
      <input
        id="normalPrice"
        type="text"
        placeholder="e.g 100 DT"
        className="input1OpenOrderArtist"
      />
    </div>
    <div>
      <label htmlFor="rapidPrice">Rapid Price:</label>
      <input
        id="rapidPrice"
        type="text"
        placeholder="e.g 150 DT"
        className="input2OpenOrderArtist"
      />
    </div>
  </div>
  <button className="submit-btnOpenOrderArtist">Set Your Prices</button>
</div>
{/*the end */} 
</>
  );
};

export default OpenOrderArtist;