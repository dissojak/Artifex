import React, { useState } from "react";
// import "../Pages/style_profile.css";
import "./PopupFollowers.css";
import Tarek from "../../assets/images/tarek.png";
import Unfollow from "../../assets/images/unfollow.svg";
const PopupFollowers = ({ onClose }) => {

  return (
    <>
      <div className="modal-content">
      <h2>Following</h2>
      <div className="followers-list">
        <div className="follower-item">
          <img src={Tarek} alt="avatar" />
          <div className="follower-info">
              <span className="follower-name">Hmed S'atour</span>
              <span className="follower-title">Digital Artist</span>
            </div>
          <span className="status-icon"><img src={Unfollow} style={{width:'15px',height:'15px'}} alt="unfollow icon" /></span>
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
    </>
  );
};
export default PopupFollowers;
