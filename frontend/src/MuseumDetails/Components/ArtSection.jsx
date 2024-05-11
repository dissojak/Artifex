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
          <div className="range-content">
            <div className="slider-range"></div>
          </div>
          <div className="range-nmr">76/100</div>
        </div>
      </div>

      {/*get pass*/}
      <div className="getyourpass-container">
        <div className="getyourpass-details">
          <div className="titleAndPin">
            <h1>Museum Name</h1>
            {/* <img src={Pin} alt="Pin" /> */}
            <label className="pinButton">
              <input type="checkbox" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 75 100"
                className="pin"
              >
                <line
                  strokeWidth="12"
                  stroke="black"
                  y2="100"
                  x2="37"
                  y1="64"
                  x1="37"
                ></line>
                <path
                  strokeWidth="10"
                  stroke="black"
                  d="M16.5 36V4.5H58.5V36V53.75V54.9752L59.1862 55.9903L66.9674 67.5H8.03256L15.8138 55.9903L16.5 54.9752V53.75V36Z"
                ></path>
              </svg>
            </label>
          </div>
          <p className="getyourpass-price">300 DT</p>
          <div className="getyourpass-ratingArtworkDetailsContainer">
            <p className="getyourpass-date"> DATE :</p>
            <div className="dateLabel-Start">12 August</div>
            <div className="dateLabel-End">18 August</div>
          </div>
          <p className="getyourpass-description">
            Uncover hidden talents and support up-and-coming artists. Our
            platform showcases a diverse range of artists, giving you the
            opportunity to find unique and innovative artwork.Uncover hidden
            talents and support up-and-coming artists. Our platform showcases a
            diverse range of artists, giving you the opportunity to find unique
            and innovative artwork.
          </p>
          <div className="getyourpass-ratingArtworkDetailsContainer">
            <p
              className="getyourpass-category"
              style={{ color: "#9866FF", fontWeight: "bold" }}
            >
              Category:{" "}
            </p>
            <p className="getyourpass-category">Digital art</p>
          </div>{" "}
          <div className="getyourpass-ratingArtworkDetailsContainer">
            <p
              className="getyourpass-category"
              style={{ color: "#9866FF", fontWeight: "bold" }}
            >
              Exclusive:{" "}
            </p>
            {/* <p className="getyourpass-category"><img src="./elements/right.svg" alt="" className="rightContainerMuseum" /></p> */}
            <p className="getyourpass-category">
              <img
                src="./elements/wrong.svg"
                alt=""
                className="wrongContainerMuseum"
              />
            </p>
          </div>
          {/*button section */}
          <div className="buttonsartsection8" style={{ paddingTop: "35px" }}>
            <div className="buttoncart8">
              <div className="button-wrappercart8">
                <div className="textcart8">
                  Get Your Pass <img src={Ticket} alt="Ticket" />
                </div>
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
