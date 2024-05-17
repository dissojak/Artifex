import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css"; // Ensure this path is correct
import Logo from "../../assets/images/Logo_Artifex.png"; // Verify the path to your logo
import Auth from "../../user/Auth/Auth";

const Nav = ({ data, openNav, closeNav }) => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  useEffect(() => {
    setIsOpenNav(openNav);
  }, [openNav]);

  return (
    <>
      {isOpenNav && <div className="navbarOverlay" onClick={closeNav}></div>}
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="Artifex Logo" className="logo" />
        </Link>
        <div className="button-container">
          <Link to="/signup" className="text-decoration-link">
            <button className="signupBtn1">SIGN UP</button>
          </Link>
          {/* <Link to="/auth?signup=true" className="signupBtn1">
            SIGN UP
          </Link> */}
          <Link to="/login">
            <button className="signupBtn">LOGIN</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
