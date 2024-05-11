import React, { useEffect } from "react";
import "./MuseumDetails.css";
import ArtSection from "../Components/ArtSection.jsx";
import ArtistParticipitant from "../Components/ArtistParticipitant.jsx";
const MuseumDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="MuseumDetails-container">
      <ArtSection />
      <ArtistParticipitant />
    </div>
  );
};

export default MuseumDetails;
