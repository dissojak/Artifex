import React, { useState } from "react";
import "./Showcase.css";

const Showcase = () => {

  return (
    <>
     
      <div className="ShowcaseMus-Banner"></div>
        <div className="ShowcaseMus-container">
          <div className="ShowcaseMus-name" > <p>Museum Name</p> </div>
          <h1 className="ShowcaseMus-title">Museum Showcase</h1>
          <p className="ShowcaseMus-details">Special Artworks Only On Our Museums</p>
        </div>
    </>
  );
};

export default Showcase;
