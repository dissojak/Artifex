import React, { useRef, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./NavArt.css";
import HomeIcon from "../../../assets/images/homexs.svg";
import HomeIconActive from "../../../assets/images/home_m3ebixs.svg";
import MuseumIcon from "../../../assets/images/museumxs.svg";
import MuseumIconActive from "../../../assets/images/museum_m3ebyxs.svg";
import ArtistsIcon from "../../../assets/images/artistxs.svg";
import ArtistsIconActive from "../../../assets/images/artist_m3ebyxs.svg";
import Logo1 from "../../../assets/images/Logo_Artifex.svg";
import HEART from "../../../assets/images/HEART.svg";
import notification from "../../../assets/images/notification.svg";
import Cart from "../../../assets/images/chariot_feragh.svg";
import MenuDropdown from "./MenuDropdown.jsx";
import Logo from "../../../assets/images/Logo_Artifex.png";
import { useGetPanierMutation } from "../../../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const NavArtifex = () => {
  const location = useLocation();
  const indicatorRef = useRef(null);

  useEffect(() => {
    const activeTab = document.querySelector(".nav-item.active");
    if (activeTab) {
      const { offsetLeft, clientWidth } = activeTab;
      indicatorRef.current.style.width = `${clientWidth - 5}px`;
      indicatorRef.current.style.left = `${offsetLeft + 8}px`;
      indicatorRef.current.style.transition = "left 0.3s ease, width 0.3s ease";
    }
  }, [location]);

  // Function to get the appropriate icon based on the active state
  const getIcon = (tabName) => {
    const isActive = location.pathname.includes(tabName);
    switch (tabName) {
      case "/home":
        return isActive ? HomeIconActive : HomeIcon;
      case "/artist":
        return isActive ? ArtistsIconActive : ArtistsIcon;
      case "/museums":
        return isActive ? MuseumIconActive : MuseumIcon;
      default:
        return HomeIcon; // Default icon in case of unmatched route
    }
  };

  const [numItemsInCard, setNumItemsInCard] = useState();
  const [getPanier, { isLoading }] = useGetPanierMutation();

  useEffect(() => {
    const req = async () => {
      try {
        const res = await getPanier();
        // console.log(res.data.artworks.length);
        setNumItemsInCard(res.data.artworks.length);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  return (
    <>
      <div className="navbarArt">
        <Link to="/home">
          <img src={Logo} alt="Artifex Logo" className="logoNavArt" />
        </Link>
      </div>
      <div className="navInNavContainer">
        <div className="nav-container">
          <NavLink
            to="/home"
            exact="true"
            id="home-tab"
            className="nav-item"
            activeclassname="active"
          >
            <img src={getIcon("/home")} alt="Home" className="iconTailleNav" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/artist"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <img
              src={getIcon("/artist")}
              alt="Artists"
              className="iconTailleNav"
            />
            <span>Artist</span>
          </NavLink>

          <NavLink
            to="/museums"
            exact="true"
            id="museums-tab"
            className="nav-item"
            activeclassname="active"
          >
            <img
              src={getIcon("/museums")}
              alt="Museums"
              className="iconTailleNav"
            />
            <span
              style={{
                position: "relative",
                top: "-6px",
                marginBottom: "-3px",
                marginTop: "10px",
              }}
            >
              Museum
            </span>
          </NavLink>
          <div className="indicatorNav" ref={indicatorRef}></div>
        </div>
        <div className="iconsRow">
          <div className="div_hw">
            <img src={notification} alt="Heart" className="im_hw" />
            <div className="nmrywgreen"></div>
          </div>
          <div className="div_hw">
            <img src={HEART} alt="Heart" className="im_hw" />
            <div className="nmryw">3</div>
          </div>
          <Link to="/Card" style={{ cursor: "pointer" }}>
            <div className="div_hw">
              <img src={Cart} alt="Heart" className="im_hw" />
              {!isLoading && (
                <>{numItemsInCard != 0 && <div className="nmryw">{numItemsInCard}</div>}</>
              )}
            </div>
          </Link>
        </div>
        <MenuDropdown />
      </div>
    </>
  );
};

export default NavArtifex;
