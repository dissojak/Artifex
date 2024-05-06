import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavArtifex.css';
import SaveIcon from "../../../assets/images/saveblack.svg";
import SaveIconActive from "../../../assets/images/savepurple.svg";
import PinIcon from "../../../assets/images/Pinblack.svg";
import PinIconActive from "../../../assets/images/Pinpurple.svg";
import OrderIcon from "../../../assets/images/orderblack.svg";
import OrderIconActive from "../../../assets/images/orderpurple.svg";

const NavArtifex = () => {
  const location = useLocation();
  const homeRef = useRef(null);
  const artistsRef = useRef(null);
  const profileRef = useRef(null);
  const indicatorRef = useRef(null);

  const getIcon = (path) => {
    switch (path) {
      case "/":
        return location.pathname === "/" ? OrderIconActive : OrderIcon;
      case "/artists":
        return location.pathname.includes('artists') ? SaveIconActive : SaveIcon;
      case "/profile":
        return location.pathname.includes('profile') ? PinIconActive : PinIcon;
      default:
        return OrderIcon; 
    }
  };

  useEffect(() => {
    let activeRef;
    if (location.pathname === '/') {
      activeRef = homeRef;
    } else if (location.pathname.includes('artists')) {
      activeRef = artistsRef;
    } else if (location.pathname.includes('profile')) {
      activeRef = profileRef;
    }

    if (activeRef.current && indicatorRef.current) {
      const { offsetLeft, clientWidth } = activeRef.current;
      indicatorRef.current.style.width = `${clientWidth}px`;
      indicatorRef.current.style.left = `${offsetLeft}px`;
      indicatorRef.current.style.transition = 'left 0.2s ease, width 0.2s ease';
    }
  }, [location]);

  return (
    <div className="Buttons-section31">
      <div className="tab-container10">
        <NavLink to="/" exact activeclassname="active" className="tab1_label text-decoration-link" ref={homeRef}>
          <img src={getIcon("/")} alt="Home Icon" style={{ marginRight: 5 }} />
          Home
        </NavLink>
        <NavLink to="/artists" exact activeclassname="active" className="tab1_label text-decoration-link" ref={artistsRef}>
          <img src={getIcon("/artists")} alt="Artists Icon" style={{ marginRight: 5 }} />
          Artists
        </NavLink>
        <NavLink to="/profile" exact activeclassname="active" className="tab1_label text-decoration-link" ref={profileRef}>
          <img src={getIcon("/profile")} alt="Profile Icon" style={{ marginRight: 5 }} />
          Profile
        </NavLink>
        <div className="indicator10" ref={indicatorRef}></div>
      </div>
    </div>
  );
};

export default NavArtifex;
