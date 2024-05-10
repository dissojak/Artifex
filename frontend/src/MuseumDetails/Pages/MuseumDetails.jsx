import React from "react";
import "./MuseumDetails.css";
import ArtSection from "../Components/ArtSection.jsx";
import ArtistParticipitant from "../Components/ArtistParticipitant.jsx";
const MuseumDetails = () => {
  return (
    <div className="MuseumDetails-container">
<ArtSection />
<ArtistParticipitant />
    </div>
  );
};

export default MuseumDetails;
