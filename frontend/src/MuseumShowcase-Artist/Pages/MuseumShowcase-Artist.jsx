import React from "react";
import './MuseumShowcase-Artist.css';
import Museumshowcase from "../Components/Showcase.jsx"
import Artworktoadd from "../Components/Artworktoadd.jsx"
const MuseumShowcaseartist = () => {
  return (
    <div className="MuseumShowcaseartist-container">
    <div id="MuseumShowcaseartist-section">
<Museumshowcase />
<Artworktoadd />
</div>
    </div>
  );
};

export default MuseumShowcaseartist;
