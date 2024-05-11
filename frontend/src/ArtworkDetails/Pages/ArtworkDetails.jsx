import React from "react";
import "./ArtworkDetails.css";
import ArtSection from "../Components/ArtImgSection.jsx";
import CommentSection from "../Components/CommentSection.jsx";
import Details from "../Components/Details.jsx";
const ArtworkDetails = () => {
  return (
    <div className="ArtworkDetails-container">
      <ArtSection />
      <div id="DetailsSectionContainer">
        <Details />
        <CommentSection />
      </div>
    </div>
  );
};

export default ArtworkDetails;
