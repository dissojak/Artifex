import React from "react";
import "./CompletedPopup.css";
import Tarek from "../../assets/images/tarek.png";
import completeArt from "../../assets/images/completeArt.png";
const CompletedPopup = ({ onClose }) => {
  return (
    <div className="modal-backdropcmpt">
      <div className="modal-contentcmpt">
      <div className="completeStatu-list">
        <div className="artist-profile-containercmpt">
       
      <div className="profile-sectioncmpt">
      <div className="photo-name-cmpt">
        <img src={Tarek} alt="Tarek chebbi" className="artist-photocmpt"/>
        <div className="follower-infocmpt">
        <h1>Tarek Chebbi</h1>
        <p className="subtitlecmpt">Artist</p>
        </div>
        </div>
        <div className="detailscmpt">
        <div className="service-type-cmplt">Service Type : Rapid</div>
          <p><span style={{color:'black',fontFamily:'Raleway-ExtraBold'}}>Type Of Art:</span> Portrait Graphique</p>
          <p><span  style={{color:'black',fontFamily:'Raleway-ExtraBold'}}>Category:</span> Digital Drawing</p>
        </div>
      </div>
      <div className="description-sectioncmpt">
        <h2>Description:</h2>
        <p>"Embark on a journey of innovation. At Artifex, we cultivate a community where creativity thrives, collaboration flourishes, and groundbreaking solutions take flight. Join us, explore, and shape the landscape of tomorrow."</p>
     
      </div>
      <img
            src="elements/X.svg"
            alt="Close"
            className="close-iconcmpt"
            onClick={onClose}
          />
    </div>
    
    <img src={completeArt} alt="Placeholder" className="CompletedStatue-containertest" />
    </div>
      </div>
    </div>
  );
};

export default CompletedPopup;
