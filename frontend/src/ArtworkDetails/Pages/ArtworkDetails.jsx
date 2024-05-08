import React from "react";
import './ArtworkDetails.css';
import ArtSection from "../Components/ArtImgSection.jsx";
import CommentSection from "../Components/CommentSection.jsx";
const ArtworkDetails = () => {
  return (
    <div className="ArtworkDetails-container">
   
      <ArtSection />
      <CommentSection />
    </div>
  );
};

export default ArtworkDetails;
