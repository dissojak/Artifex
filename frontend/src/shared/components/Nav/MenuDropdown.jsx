import React, { useRef, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./MenuDropdown.css"; // Ensure the CSS file is named appropriately
import avatar from "../../../assets/images/default_profile_img.jpg"; // Ensure paths are correct
import userIcon from "../../../assets/images/usertest.png";
import eventIcon from "../../../assets/images/evenement.png";
import editIcon from "../../../assets/images/edit.png";
import settingsIcon from "../../../assets/images/settings.png";
import questionIcon from "../../../assets/images/question.png";
import logoutIcon from "../../../assets/images/log-out.png";
import purchasesIcon from "../../../assets/images/purchases.png";
import PlansHisotyIcon from "../../../assets/images/PlansHistory.svg";
import logoutIconActive from "../../../assets/images/log-out_m3ebi.png";
import drop from "../../../assets/images/drop.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../slices/usersApiSlice";
import { logout } from "../../../slices/authSlice";
import { toast } from "react-toastify";

function MenuDropdown() {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef();

  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const isClient = userInfo.userType === "client";
  const isArtist = userInfo.userType === "artist";
  const isAdmin = userInfo.userType === "admin";

  const menuToggle = () => {
    setIsActive(!isActive);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="actionss" ref={menuRef}>
      <div className="profile" onClick={menuToggle}>
        <img src={userInfo.image || avatar} alt="Profile" />
      </div>
      <img
        src={drop}
        style={{
          width: "13px",
          height: "13px",
          position: "relative",
          left: "48px",
          bottom: "20px",
        }}
        alt="drop"
      />
      <div className={isActive ? "menu active" : "menu"}>
        <h3 style={{ textAlign: "left", fontFamily: "Raleway-Bold" }}>
          {userInfo.username}
        </h3>
        <p style={{ textAlign: "left", fontFamily: "Raleway-Regular" }}>
          {userInfo.email}
        </p>
        <div className="menu-item">
          <img src={userIcon} alt="My Profile" />
          <Link to="/profile" onClick={() => setIsActive(false)}>
            My profile
          </Link>
        </div>
        {isClient && (
          <div className="menu-item">
            <img src={purchasesIcon} alt="Edit Profile" />
            <Link to="/collection" onClick={() => setIsActive(false)}>
              Collection
            </Link>
          </div>
        )}
        {isArtist && (
          <div className="menu-item">
            <img src={PlansHisotyIcon} alt="Edit Profile" />
            <Link to="/planshistory" onClick={() => setIsActive(false)}>
              Plans History
            </Link>
          </div>
        )}
        {!isAdmin && (
          <div className="menu-item">
            <img src={eventIcon} alt="Edit Profile" />
            <Link to="/events" onClick={() => setIsActive(false)}>
              Events
            </Link>
          </div>
        )}
        <div className="menu-item">
          <img src={settingsIcon} alt="Settings" />
          <a href="#">Setting</a>
        </div>
        <div className="menu-item">
          <img src={questionIcon} alt="Help" />
          <a href="#">Help</a>
        </div>
        <div
          className="menu-item"
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
        >
          <img
            src={isLogoutHovered ? logoutIconActive : logoutIcon}
            alt="Logout"
          />
          <a
            onClick={() => {
              logoutHandler();
              setIsActive(false);
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default MenuDropdown;
