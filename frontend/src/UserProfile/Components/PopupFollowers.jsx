import React, { useState } from "react";
// import "../Pages/style_profile.css";
import "./PopupFollowers.css";
import Tarek from "../../assets/images/tarek.png";
import Unfollow from "../../assets/images/unfollow.svg";
const Followers = [
    { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art"},
    { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art"},
    { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art"},
    { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art"},
  ];
const PopupFollowers = ({ onClose }) => {

  return (
    <>
      <div className="modal-content">
        
      <p style={{fontSize:'24px',fontFamily:'Raleway-Bold'}}>Following  <img
              src="elements/X.svg"
              alt=""
              className="tit_ch_img_in_followers"
              onClick={onClose} 
            /></p>
     
      <div className="followers-list">
      {Followers.map((Follower) => (
        <div className="follower-item">
        <div className="follower-img-avatar">
          <img src={Follower.Image} alt="avatar" />
          </div>
          <div className="follower-info">
              <span className="follower-name">{Follower.Artist}</span>
              <span className="follower-title">{Follower.Category}</span>
            </div>
          <span className="status-icon"><img src={Unfollow} style={{width:'35px',height:'35px'}} alt="unfollow icon" /></span>
        </div>
           ))}
      </div>
     
     
    </div>
    </>
  );
};
export default PopupFollowers;
