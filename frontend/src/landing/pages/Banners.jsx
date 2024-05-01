import React from "react";
import icon1 from "../../assets/images/community.svg";
import icon2 from "../../assets/images/transaction.svg";
import icon3 from "../../assets/images/event.svg";

import "./Banners.css";

const Banners = () => {
  return (
    <div className="bannerSection">
      <div className="banner">
        <div className="box">
          <div className="responsive-banner" style={{ backgroundColor: "#7E3FFF" }}>
            <img src={icon1} className="icon-img" alt=''/>
            <p className="special-paragraph">
              Join Our Artistic Community Today !
            </p>
          </div>
        </div>
        <div className="box">
          <div className="responsive-banner" style={{ backgroundColor: "#5BD6FF" }}>
            <img src={icon2} className="icon-img" alt=''/>
            <p className="special-paragraph">
            Secure Transactions For Artists !
            </p>
          </div>
        </div>
        <div className="box">
          <div className="responsive-banner" style={{ backgroundColor: "#7E3FFF" }}>
            <img src={icon3} className="icon-img" alt=''/>
            <p className="special-paragraph">
              Museum Showcases : Discover Exclusive
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
