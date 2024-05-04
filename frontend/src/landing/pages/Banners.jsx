import React from "react";
import icon1 from "../../assets/images/community.svg";
import icon2 from "../../assets/images/transaction.svg";
import icon3 from "../../assets/images/event.svg";

import "./Banners.css";

const Banners = () => {
  return (
    <div className="bannerSection">
      <div className="banner">
      <div className="cardtest">
  <div className="card-inner">
    <div className="card-front">
    <div className="responsive-banner">
            <img src={icon1}  className="icon-img" alt=''/>
            <p className="special-paragraph">
            Join Our Artistic Community Today !
            </p>
          </div>
    </div>
    <div className="card-back">
    <p className="special-paragraphback">
    "Discover and connect with talented artists on Artifex. 
Explore diverse portfolios and engage directly with creators.
Your artistic journey starts here."
            </p>
            <div style={{paddingTop:'40px',textAlign:'center'}}>
            <button className="signup-button-back">SIGN UP</button>
      <button className="login-button-back">LOGIN</button>
      </div>
    </div>
  </div>
</div>

<div className="cardtest">
  <div className="card-inner">
    <div className="card-front2">
    <div className="responsive-banner">
            <img src={icon2}  className="icon-img" alt=''/>
            <p className="special-paragraph">
            Secure Transactions For Artists !
            </p>
          </div>
    </div>
    <div className="card-back2">
    <p className="special-paragraphback">
    "At Artifex, we prioritize security and seamless payments. Our encrypted platform ensures your financial information is safe, allowing you to buy and sell art with confidence."
            </p>
            <div style={{paddingTop:'40px',textAlign:'center'}}>
            <button className="signup-button-back2">SIGN UP</button>
      <button className="login-button-back2">LOGIN</button>
      </div>
    </div>
  </div>
</div>

<div className="cardtest">
  <div className="card-inner">
    <div className="card-front">
    <div className="responsive-banner">
            <img src={icon3} className="icon-img" alt=''/>
            <p className="special-paragraph">
              Museum Showcases : Discover Exclusive
            </p>
          </div>
      

    </div>
    <div className="card-back">
      
      <p className="special-paragraphback">
      "Artifex unveils exclusive artworks at museum events, offering patrons the chance to acquire unique pieces not found elsewhere."
            </p>
            <div style={{paddingTop:'40px',textAlign:'center'}}>
            <button className="signup-button-back">SIGN UP</button>
      <button className="login-button-back">LOGIN</button>
      </div>
    </div>
  </div>
</div>

        
      </div>
    </div>
  );
};

export default Banners;
{/*
<div className="box">
          <div className="responsive-banner" style={{ backgroundColor: "#7E3FFF" }}>
            <img src={icon3} className="icon-img" alt=''/>
            <p className="special-paragraph">
              Museum Showcases : Discover Exclusive
            </p>
          </div>
</div>*/}