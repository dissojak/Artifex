import React from "react";
import "./ArtSection.css";
import Art from "../../assets/images/image 2.png";
import Ticket from "../../assets/images/Tracé 10.svg";
import Pass from "../../assets/images/event_pass.svg";
import Pin from "../../assets/images/Pinblack.svg";
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
      <h1>Museum Name  <img src={Pin} alt="Pin"  /></h1>
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
      <div className="buttonsartsection8" style={{paddingTop:'80px'}}>
        <div className="buttoncart8">
          <div className="button-wrappercart8">
            <div className="textcart8">Get Your Pass  <img src={Ticket} alt="Ticket"  /></div>
            <span className="iconcart8">
            <img src={Pass} alt="Ticket" className="bi bi-cart2" />
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
