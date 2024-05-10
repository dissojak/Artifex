import React from "react";
import "./ArtSection.css";
import Art from "../../assets/images/image 2.png";
import Adem from "../../assets/images/Adem.jpg";
const ArtSection = () => {
  return (
    <div id="ArtSection-Section">

        <div className="Artsandbar-container">
        <img src={Art} alt="Placeholder" className="ArtSection-containertest" />
        <div className="range_container">
        <div className="range-content">   <div className="slider-range"></div> </div>
        <div className="range-nmr" >76/100</div>
      </div>
        </div>

        {/*get pass*/}
        <div className="getyourpass-container">
        <div className="getyourpass-details">
      <h1>Museum Name</h1>
      <p className="getyourpass-price">300 DT</p>
      <div className="getyourpass-ratingArtworkDetailsContainer">
        <p className="getyourpass-date"> DATE :</p>
        <div class="dateLabel-Start">12 August</div>
        <div class="dateLabel-End">18 August</div>
      </div>
      <p className="getyourpass-description">
      Uncover hidden talents and support up-and-coming artists. Our platform showcases a diverse range of artists, giving you the opportunity to find unique and innovative artwork.Uncover hidden talents and support up-and-coming artists. Our platform showcases a diverse range of artists, giving you the opportunity to find unique and innovative artwork.
      </p>
      <div className="getyourpass-ratingArtworkDetailsContainer">
        <p className="getyourpass-category" style={{color:"#9866FF",fontWeight: "bold"}}>Category: </p>
        <p className="getyourpass-category">Digital art</p>
      </div>
      {/*button section */}
      <div className="buttonsartsection" style={{paddingTop:'80px'}}>
        <div className="buttoncart">
          <div className="button-wrappercart">
            <div className="textcart">Get Your Pass</div>
            <span className="iconcart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-cart2"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </span>
          </div>
          </div>
          </div>
    </div>
        </div>
        
        {/*end*/}

    </div>
  );
};

export default ArtSection;
