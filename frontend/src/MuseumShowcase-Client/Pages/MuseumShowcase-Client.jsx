import React from "react";
import './MuseumShowcase-Client.css';
import Museumshowcase from "../Components/Showcase.jsx"
import Artworks from "../Components/MuseumArtwork.jsx"
const MuseumShowcaseclient = () => {
  return (
    <div className="MuseumShowcaseclient-container">
    <div id="ShowcaseMus-section">
<Museumshowcase />
<Artworks />
</div>
    </div>
  );
};

export default MuseumShowcaseclient;
