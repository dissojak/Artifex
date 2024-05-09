import React from "react";
import "./ArtImgSection.css";
import Adem from "../../assets/images/Adem.jpg";
import Art from "../../assets/images/image 1.png";
const ArtImgSection = () => {
  return (
    <div id="ArtImgSection">
      <div className="Artist-container-ArtImg">
        <img src={Adem} alt="Adem Ben Amor" className="Artist-image-ArtImg" />
        <div className="Artist-info-ArtImg">
          <div className="Artist-name-ArtImg">Adem Ben Amor</div>
          <div className="Artist-Type-ArtImg">Digital Artist</div>
        </div>
      </div>
      <div className="image-containertest">
        <img src={Art} alt="Placeholder" className="image-placeholdertest" />
      </div>
    </div>
  );
};

export default ArtImgSection;
