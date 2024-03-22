import React from "react";
import "./SBLoader.css";

const SBLoader = props => {
  if (props.asOverlay) {
    return (
      <div className="loader-overlay">
        <div className="background-overlay"></div>
        <div className="ui-abstergo">
          <div className="abstergo-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="ui-text">
            <div className="loader">
              <span>SahraBytes</span>
              <span>SahraBytes</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default SBLoader;
