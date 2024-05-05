import React, { useState, useContext, useEffect } from "react";
import "./NavArtifex.css";
import SaveIcon from "../../../assets/images/saveblack.svg";
import SaveIconActive from "../../../assets/images/savepurple.svg";
import PinIcon from "../../../assets/images/Pinblack.svg";
import PinIconActive from "../../../assets/images/Pinpurple.svg";
import OrderIcon from "../../../assets/images/orderblack.svg";
import OrderIconActive from "../../../assets/images/orderpurple.svg";
import { AuthContext } from "../../context/auth-context";
import { NavLink } from "react-router-dom";

const NavArtifex = () => {
  const [activeTab, setActiveTab] = useState("home");
  const auth = useContext(AuthContext);

  useEffect(() => {
    const handleRouteChange = () => {
      // Set the active tab based on the current path
      const path = window.location.pathname;
      console.log(path);
      if (path === "/") setActiveTab("home");
      else if (path.includes("artists")) setActiveTab("artists");
      else if (path.includes("profile")) setActiveTab("profile");
    };
  
    window.addEventListener('popstate', handleRouteChange);
  
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const getIcon = (tabName) => {
    if (tabName === "home") {
      return activeTab === "home" ? OrderIconActive : OrderIcon;
    } else if (tabName === "artists") {
      return activeTab === "artists" ? SaveIconActive : SaveIcon;
    } else if (tabName === "profile") {
      return activeTab === "profile" ? PinIconActive : PinIcon;
    }
  };

  return (
    <>
      <div className="Buttons-section31">
        <div className="tab-container10">
          <NavLink to="/" exact="true" className="text-decoration-link">
            <input
              type="radio"
              name="tabNav"
              id="tab11"
              className="tab1 tab1--1"
              checked={activeTab === "home"}
              onChange={() => setActiveTab("home")}
            />
            <label
              className={`tab1_label ${activeTab === "home" ? "active" : ""}`}
              htmlFor="tab1"
            >
              <img
                src={getIcon("home")}
                style={{ width: "1.2em", height: "1.2em" }}
                alt="Order Icon"
              />
              <p className="testeeee">Home</p>
            </label>
          </NavLink>
          <NavLink to="/artists" exact="true" className="text-decoration-link">
            <input
              type="radio"
              name="tabNav"
              id="tab22"
              className="tab1 tab1--2"
              checked={activeTab === "artists"}
              onChange={() => setActiveTab("artists")}
            />
            <label
              className={`tab1_label ${
                activeTab === "artists" ? "active" : ""
              }`}
              htmlFor="tab2"
            >
              <img
                src={getIcon("artists")}
                style={{ width: "1.2em", height: "1.2em" }}
                alt="Save Icon"
              />
              Artists
            </label>
          </NavLink>
          <NavLink to="/profile" exact="true" className="text-decoration-link">
            <input
              type="radio"
              name="tabNav"
              id="tab33"
              className="tab1 tab1--3"
              checked={activeTab === "profile"}
              onChange={() => setActiveTab("profile")}
            />
            <label
              className={`tab1_label ${
                activeTab === "profile" ? "active" : ""
              }`}
              htmlFor="tab3"
            >
              <img
                src={getIcon("profile")}
                style={{ width: "1.2em", height: "1.2em" }}
                alt="Pin Icon"
              />
              Profile
            </label>
          </NavLink>
          <div className="indicator10"></div>
        </div>
      </div>
    </>
  );
};

export default NavArtifex;
