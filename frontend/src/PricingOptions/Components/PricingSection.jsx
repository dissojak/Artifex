import React, { useState } from "react";
import "./PricingSection.css";
import Crown from "../../assets/images/crown.svg";
import Diamond from "../../assets/images/platinumBadge2.svg";
import PlatinumBadge from "../../assets/images/diamant.svg";
import Footer from "../../shared/components/UIElements/Footer";
const Options = [
  { Image: Crown, Type: "Gold", Price: "20", Monetize: "20%" },
  { Image: PlatinumBadge, Type: "Platinum", Price: "35", Monetize: "40%" },
  { Image: Diamond, Type: "Diamond", Price: "50", Monetize: "60%" },
];
const PricingSection = () => {
  return (
    <>
      <div id="PricingSection-section">
        <div className="PricingSection-container7">
          <p
            className="PricingSection-details7"
            style={{
              fontSize: "12px",
              color: "#5bd6ff",
              fontFamily: "Raleway-Bold",
            }}
          >
            Discover
          </p>
          <h1 className="PricingSection-name7">Pricing Options</h1>
          <p className="PricingSection-details7">
            Choose the plan that suits your needs
          </p>
          {/*cards start  */}
          <div className="OptionsCards-container">
            {Options.map((Option) => (
              <div className="planCard">
                <div className="planContent">
                  <div className="planHeader">{Option.Type}</div>
                  <div className="planPrice">
                    <img
                      src={Option.Image}
                      alt="Options"
                      className="OptionsIcons"
                      style={
                        Option.Type === "Diamond"
                          ? { width: "55px", height: "55px" }
                          : {}
                      }
                    />
                    <span style={{ fontFamily: "Dubai-Bold" }}>
                      {Option.Price}DT
                    </span>
                  </div>
                  <div className="planFeatures">
                    <p>{Option.Monetize} Monetize</p>
                  </div>
                </div>
                <button className="planButton">Get Plan</button>
              </div>
            ))}
          </div>
          {/*cards ends */}
        </div>      
      </div>
      <div className="footerContainerPricingSection">
        <Footer width={99.4} />
      </div>
    </>
  );
};

export default PricingSection;
