import React, { useState } from "react";
import "./PlansHistorySection.css";
import Crown from "../../assets/images/crown.svg";
import Diamond from "../../assets/images/platinumBadge2.svg";
import PlatinumBadge from "../../assets/images/diamant.svg";
import Footer from "../../shared/components/UIElements/Footer";
const Options = [
  { Image: Crown, Type: "Gold", Start: "12 August",Ends:"18 August", Monetize: "20%" },
  { Image: PlatinumBadge, Type: "Platinum", Start: "12 August",Ends:"18 August", Monetize: "40%" },
  { Image: Diamond, Type: "Diamond", Start: "12 August",Ends:"18 August", Monetize: "60%" },
  { Image: Crown, Type: "Gold", Start: "12 August",Ends:"18 August", Monetize: "20%" },
  { Image: PlatinumBadge, Type: "Platinum", Start: "12 August",Ends:"18 August", Monetize: "40%" },
  { Image: Diamond, Type: "Diamond", Start: "12 August",Ends:"18 August", Monetize: "60%" },
  { Image: Crown, Type: "Gold", Start: "12 August",Ends:"18 August", Monetize: "20%" },
  { Image: PlatinumBadge, Type: "Platinum", Start: "12 August",Ends:"18 August", Monetize: "40%" },
  { Image: Diamond, Type: "Diamond", Start: "12 August",Ends:"18 August", Monetize: "60%" },
]; 
const PlansHistorySection = () => {
  return (
    <>
      <div id="PlansHistorySection-section"> 
        <div className="PlansHistorySection-container7">
       
          <h1 className="PlansHistorySection-name7">Plans History</h1>
          <p className="PlansHistorySection-details7">
          Your recent plans you were subscribed in.
          </p>
          {/*cards start  */}
          <div className="PlansHistorySection-container">
            {Options.map((Option) => (
              <div className="planCardHistory">
                <div className="planContentHistory">
                  <div className="planHeaderHistory">{Option.Type}</div>
                  <div className="planPriceHistory">
                    <img
                      src={Option.Image}
                      alt="Options"
                      className="OptionsIconsHistory"
                      style={
                        Option.Type === "Diamond"
                          ? { width: "55px", height: "55px" }
                          : {}
                      }
                    />
                    <span style={{ fontFamily: "Dubai-Bold" }}>
                    <div className="dateLabel-Start-PlansHistory">{Option.Start}</div>
            <div className="dateLabel-End-PlansHistory">{Option.Ends}</div>
                    </span>
                  </div>
                  <div className="planFeaturesHistory">
                    <p>{Option.Monetize} Monetize</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/*cards ends */}
        </div>
      </div>
    </>
  );
};

export default PlansHistorySection;
