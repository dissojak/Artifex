import React, { useState } from "react";
import "./Showcase.css";

const Showcase = () => {

  return (
    <>
     
      <div className="ShowcaseMusartist-Banner"></div>
        <div className="ShowcaseMusartist-container">
          <div className="ShowcaseMusartist-name" > <p>Museum Name</p> </div>
          <h1 className="ShowcaseMusartist-title">Museum Showcase</h1>
          <p className="ShowcaseMusartist-details">Special Artworks Only On Our Museums</p>
        </div>
    </>
  );
};

export default Showcase;
