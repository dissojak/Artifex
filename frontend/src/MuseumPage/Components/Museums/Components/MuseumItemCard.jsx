import React, { useEffect, useState } from "react";
import MuseumImage from "../../../../assets/images/BIG.svg"; // Update path accordingly
import TraceImage from "../../../../assets/images/Tracé 10.svg"; // Update path accordingly
import EventPassImage from "../../../../assets/images/event_pass.svg"; // Update path accordingly
import ProfileImage from "../../../../assets/images/Adem.jpg";
import "../Pages/Museums.css";
import { toast } from "react-toastify";
const MuseumItemCard = (props) => {
    function formatDate(dateString) {
        const options = { day: "2-digit", month: "long" }; // Use 'long' to get the full month name
        return new Date(dateString).toLocaleDateString("en-GB", options); // Adjusted for day and full month name
    }    
  
  return (
    <>
     <div className="event-card11">
      <div className="event-image11">
        <img src={props.Image} alt="Event Image11" className="event-image11"/>
        <div className="event-overlay11">
          <div className="event-overlay-top11">
            <div className="event-date11">
              <div className="event-debut-date11">{formatDate(props.Start)}</div>
              <div className="event-end-date11">{formatDate(props.Ends)}</div>
            </div>
            <div className="event-price11">{props.priceClient} DT</div>
          </div>
          <div className="event-overlay-bottom11">
         
          {/* heart button code */}
          <div className="card22">
  <div className="icon22">
    <div title="Like" className="heart-container22">
      <input id="Give-It-An-Id" className="checkbox22" type="checkbox" />
      <div className="svg-container22">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svg-outline22"
          viewBox="0 0 24 24"
        >
          <linearGradient id="gradientColor">
            <stop stop-color="#7eaaff" offset="5%"></stop>
            <stop stop-color="#ff48fb" offset="95%"></stop>
          </linearGradient>
          <path
            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"
          ></path>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svg-filled22"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100"
          width="100"
          className="svg-celebrate22"
        >
          <polygon points="10,10 20,20"></polygon>
          <polygon points="10,50 20,50"></polygon>
          <polygon points="20,80 30,70"></polygon>
          <polygon points="90,10 80,20"></polygon>
          <polygon points="90,50 80,50"></polygon>
          <polygon points="80,80 70,70"></polygon>
        </svg>
      </div>
    </div>
  </div>
</div>

          {/* heart button code ends */}

        
            <button className="btn-pass11">
              <span className="btn-text-one11">
                Get Your Pass <img src={TraceImage} alt="" />
              </span>
              <span className="btn-text-two11">
                <img src={EventPassImage} alt="" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="cc11">{props.name}</h1>
        <p className="ccp11">{props.Description}</p>
      </div>
      <div className="div-bottom11">
        <div className="btn-da11">{props.Categorie}</div>
        <div className="profile-container11">
          <li>
            <img src={ProfileImage} alt="" className="profile-image11" />
          </li>
          <li>
            <img src={ProfileImage} alt="" className="profile-image11" />
          </li>
          <li>
            <img src={ProfileImage} alt="" className="profile-image11" />
          </li>
          <li>
            <img src={ProfileImage} alt="" className="profile-image11" />
          </li>
        </div>
      </div>
      <div className="range-container11">
        <div className="range-content11">
          <div className="slider-range11"></div>
        </div>
        <div className="range-nmr11">{props.Range}/100</div>
      </div>
    </div>
    </>
  );
};

export default MuseumItemCard;
