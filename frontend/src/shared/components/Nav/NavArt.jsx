import React, { useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./NavArt.css";
import HomeIcon from "../../../assets/images/saveblack.svg";
import ArtistsIcon from "../../../assets/images/orderblack.svg";
import MuseumIcon from "../../../assets/images/Pinblack.svg";
import HomeIconActive from "../../../assets/images/savepurple.svg";
import MuseumIconActive from "../../../assets/images/Pinpurple.svg";
import ArtistsIconActive from "../../../assets/images/orderpurple.svg";
import Logo from "../../../assets/images/Logo_Artifex.svg"; 
import HEART from "../../../assets/images/HEART.svg"; 
import notification from "../../../assets/images/notification.svg"; 
import Cart from "../../../assets/images/chariot_feragh.svg"; 
import MenuDropdown from "./MenuDropdown.jsx";

const NavArtifex = () => {
  const location = useLocation();
  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeTab = document.querySelector(".nav-item.active");
    if (activeTab) {
      const { offsetLeft, clientWidth } = activeTab;
      indicatorRef.current.style.width = `${clientWidth}px`;
      indicatorRef.current.style.left = `${offsetLeft}px`;
      indicatorRef.current.style.transition = "left 0.3s ease, width 0.3s ease";
    }
  }, [location]);

  // Function to get the appropriate icon based on the active state
  const getIcon = (tabName) => {
    const isActive = location.pathname === tabName;
    switch (tabName) {
      case "/":
        return isActive ? HomeIconActive : HomeIcon;
      case "/artists":
        return isActive ? ArtistsIconActive : ArtistsIcon;
      case "/museums":
        return isActive ? MuseumIconActive : MuseumIcon;
      default:
        return HomeIcon; // Default icon in case of unmatched route
    }
  };

  return (
    <>
      <div className="navbarArt">
        <Link to="/">
          <img src={Logo} alt="Artifex Logo" className="logoNavArt" />
        </Link>
      </div>
      <div className="navInNavContainer">
        <div className="nav-container">
          <NavLink
            to="/"
            exact="true"
            id="home-tab"
            className="nav-item"
            activeclassname="active"
          >
            <img src={getIcon("/")} alt="Home" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/artists"
            exact="true"
            id="artists-tab"
            className="nav-item"
            activeclassname="active"
          >
            <img src={getIcon("/artists")} alt="Artists" />
            <span>Artists</span>
          </NavLink>
          <NavLink
            to="/profile"
            exact="true"
            id="museums-tab"
            className="nav-item"
            activeclassname="active"
          >
            <img src={getIcon("/museums")} alt="Museums" />
            <span>Profile</span>
          </NavLink>
          <div className="indicatorNav" ref={indicatorRef}></div>
          <div className="iconsRow">
            <div className="div_hw">
                <img src={notification} alt="Heart" className="im_hw" />
                <div className="nmrywgreen"></div>
            </div>
            <div className="div_hw">
                <img src={HEART} alt="Heart" className="im_hw" />
                <div className="nmryw">3</div>
            </div>
            <div className="div_hw">
                <img src={Cart} alt="Heart" className="im_hw" />
                <div className="nmryw">12</div>
            </div>
        </div>
        </div>
       
       
        <MenuDropdown />
      </div>
    </>
  );
};

export default NavArtifex;
