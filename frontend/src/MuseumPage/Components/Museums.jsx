import React, {  } from "react";
import "./Museums.css";
import MuseumImage from '../../assets/images/BIG.svg'; // Update path accordingly
import TraceImage from '../../assets/images/Tracé 10.svg'; // Update path accordingly
import EventPassImage from '../../assets/images/event_pass.svg'; // Update path accordingly
import ProfileImage from '../../assets/images/Adem.jpg';
const MuseumsCards = [
  { Image: MuseumImage, Start: "18 August", Ends: "23 August", Price: "10",Name:"Creativity Conclave",Description:"Uniting artists to inspire and innovate. Workshops, discussions, and showcases await!",Categorie:"Digital Art",Range:"76",Profile:ProfileImage },
  { Image: MuseumImage, Start: "18 August", Ends: "23 August", Price: "10",Name:"Creativity Conclave",Description:"Uniting artists to inspire and innovate. Workshops, discussions, and showcases await!",Categorie:"Digital Art",Range:"76",Profile:ProfileImage },
  { Image: MuseumImage, Start: "18 August", Ends: "23 August", Price: "10",Name:"Creativity Conclave",Description:"Uniting artists to inspire and innovate. Workshops, discussions, and showcases await!",Categorie:"Digital Art",Range:"76",Profile:ProfileImage },
  { Image: MuseumImage, Start: "18 August", Ends: "23 August", Price: "10",Name:"Creativity Conclave",Description:"Uniting artists to inspire and innovate. Workshops, discussions, and showcases await!",Categorie:"Digital Art",Range:"76",Profile:ProfileImage },
  { Image: MuseumImage, Start: "18 August", Ends: "23 August", Price: "10",Name:"Creativity Conclave",Description:"Uniting artists to inspire and innovate. Workshops, discussions, and showcases await!",Categorie:"Digital Art",Range:"76",Profile:ProfileImage },
  { Image: MuseumImage, Start: "18 August", Ends: "23 August", Price: "10",Name:"Creativity Conclave",Description:"Uniting artists to inspire and innovate. Workshops, discussions, and showcases await!",Categorie:"Digital Art",Range:"76",Profile:ProfileImage },
];
const Museums = () => {


  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
  
    <div id="museum-section">
    <div className="museum-section2">
        <p style={{color:'#5BD6FF',fontWeight:'bold'}}>Discover</p>
    <h1 style={{fontWeight:'bold',fontSize:'40px'}}>Check Out Our Museums</h1>
    <p>Get to know the special pieces from our artists in Artifex.</p>
  </div>
<div className="museum-container">
{/* card start*/}
{MuseumsCards.map((MuseumsCard) => (
<div className="event-card11">
      <div className="event-image11">
        <img src={MuseumsCard.Image} alt="Event Image11" />
        <div className="event-overlay11">
          <div className="event-overlay-top11">
            <div className="event-date11">
              <div className="event-debut-date11">{MuseumsCard.Start}</div>
              <div className="event-end-date11">{MuseumsCard.Ends}</div>
            </div>
            <div className="event-price11">{MuseumsCard.Price} DT</div>
          </div>
          <div className="event-overlay-bottom11">
           
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
        <h1 className="cc11">{MuseumsCard.Name}</h1>
        <p className="ccp11">{MuseumsCard.Description}</p>
      </div>
      <div className="div-bottom11">
        <button className="btn-da11">{MuseumsCard.Categorie}</button>
        <div className="profile-container11">
          <li><img src={MuseumsCard.Profile} alt="" className="profile-image11" /></li>
          <li><img src={MuseumsCard.Profile} alt="" className="profile-image11" /></li>
          <li><img src={MuseumsCard.Profile} alt="" className="profile-image11" /></li>
          <li><img src={MuseumsCard.Profile} alt="" className="profile-image11" /></li>
        </div>
      </div>
      <div className="range-container11">
        <div className="range-content11">
          <div className="slider-range11"></div>
        </div>
        <div className="range-nmr11">{MuseumsCard.Range}/100</div>
      </div>
    </div>
       ))}
{/*card ends */}
</div>
</div>
</>
  );
};

export default Museums;