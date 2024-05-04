import React, {  } from "react";
import "./Profile.css";
import Save from "../assets/images/save.svg";
import Pin from "../assets/images/Pin.svg";
import Order from "../assets/images/order.svg";
import Adem from "../assets/images/Adem.png";
const Profile = () => {
 

  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
  
    <div id="Profile-section">
    <div className="Profile-section2">
   
    <div className="Buttons-section3">
    <div className="tab-container">
  <input type="radio" name="tab" id="tab1" class="tab tab--1" />
  <label className="tab_label" for="tab1"><img src={Order} style={{width:'1.2em',height:'1.2em'}}/>Booking Orders</label>

  <input type="radio" name="tab" id="tab2" class="tab tab--2" />
  <label className="tab_label" for="tab2"><img src={Save} style={{width:'1.2em',height:'1.2em'}}/>Saved Artworks</label>

  <input type="radio" name="tab" id="tab3" class="tab tab--3" />
  <label className="tab_label" for="tab3"><img src={Pin} style={{width:'1.2em',height:'1.2em'}}/>Pinned Museums</label>

  <div className="indicator"></div>
</div>
  </div>
</div>
</div>
</>
  );
};

export default Profile;