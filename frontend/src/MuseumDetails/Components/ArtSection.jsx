import React from "react";
import "./ArtSection.css";
import Art from "../../assets/images/image 2.png";
const ArtSection = () => {
  return (
    <div id="ArtSection-Section">

    <div className="ArtSection-Section2">
        
        <img src={Art} alt="Placeholder" className="ArtSection-containertest" />
    </div>
    </div>
  );
};

export default ArtSection;
