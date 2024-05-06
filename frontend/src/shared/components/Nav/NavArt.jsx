import React, { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavArt.css';
import HomeIcon from "../../../assets/images/saveblack.svg";
import ArtistsIcon from "../../../assets/images/orderblack.svg";
import MuseumIcon from "../../../assets/images/Pinblack.svg";
import HomeIconActive from "../../../assets/images/savepurple.svg";
import MuseumIconActive from "../../../assets/images/Pinpurple.svg";
import ArtistsIconActive from "../../../assets/images/orderpurple.svg";

const NavArtifex = () => {
  const location = useLocation();
  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeTab = document.querySelector('.nav-item.active');
    if (activeTab) {
      const { offsetLeft, clientWidth } = activeTab;
      indicatorRef.current.style.width = `${clientWidth}px`;
      indicatorRef.current.style.left = `${offsetLeft}px`;
      indicatorRef.current.style.transition = 'left 0.3s ease, width 0.3s ease';
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
        return HomeIcon;  // Default icon in case of unmatched route
    }
  };

  return (
    <div className='navInNavContainer'>
      <div className="nav-container">
        <NavLink to="/" exact="true" id="home-tab" className="nav-item" activeClassName="active">
          <img src={getIcon("/")} alt="Home" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/artists" exact="true" id="artists-tab" className="nav-item" activeClassName="active">
          <img src={getIcon("/artists")} alt="Artists" />
          <span>Artists</span>
        </NavLink>
        <NavLink to="/profile" exact="true" id="museums-tab" className="nav-item" activeClassName="active">
          <img src={getIcon("/museums")} alt="Museums" />
          <span>Profile</span>
        </NavLink>
        <div className="indicatorNav" ref={indicatorRef}></div>
      </div>
    </div>
  );
};

export default NavArtifex;
