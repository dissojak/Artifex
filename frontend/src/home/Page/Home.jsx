import React, { useContext, useEffect, useState } from "react";

import "./Home.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

import Facebook from "../../assets/images/Facebook.svg";
import Instagram from "../../assets/images/Instagram.svg";
import Twitter from "../../assets/images/Tracé 2.svg";
import Arrow from "../../assets/images/Forward_arrow.svg";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <>
     

      {auth.isLoggedIn && (
        <>
          <div id="header_right_home">
            <button className="button_header_right_home">
              {" "}
              <img className="pol" src="elements/Polygone 3.svg" alt="" />
            </button>
            <h1 className="username">{auth.userName}</h1>
          </div>
        </>
      )}
      {/* // this is just for updating git , deleteing backend-auth */}
      <div id="home1">
        <div id={auth.isAdmin ? "home2-admin" : "home2"}>
          <h1
            className="where"
            style={!auth.isAdmin ? { color: "#5BD6FF" } : { color: "#5BD6FF" }}
          >
            WHERE CREATIVITY{" "}
          </h1>
          <h1 className="meets">UNLEASHES POSSIBILITIES</h1>
          <p className="p1">
            "Embark on a journey of innovation. At Artifex, we cultivate a
            community where creativity thrives, collaboration flourishes, and
            <br />
            groundbreaking solutions take flight. Join us, explore, and shape
            the landscape of tomorrow."
          </p>

          <button
            className="button_home"
            onClick={() =>
              (window.location.href = "mailto:StoonProduction@gmail.com")
            }
          >
            <h2
              className="button_home_Artifex"
            >
              For Hosting
            </h2>
            <h2
              className="button_home_2"
              style={
                !auth.isAdmin
                  ? { color: "#ffff", backgroundColor: "#5BD6FF" }
                  : { color: "#ffff", backgroundColor: "#5BD6FF" }
              }
            >
              Contact us
            </h2>
            <img
              src={Arrow}
              alt=""
              className="arrow"
              style={{ padding: "9px 0", color: "black" }}
            />
          </button>
          <div className="social-links2">
          <Link to="https://www.facebook.com/ArtifexMareketplace" target="_blank">
              {" "}
              <img src={Facebook} alt="Facebook" />
            </Link>
            <Link to="https://www.instagram.com/artifexMarketPlace" target="_blank">
              {" "}
              <img src={Instagram} alt="Instagram" />
            </Link>
            <Link to="https://twitter.com/Artifex_MP" target="_blank">
              {" "}
              <img src={Twitter} alt="FaceTwitterbook" />
            </Link>
          
          </div>
          <ul className="icons_home">
            <li>
              {" "}
              <img src="../assets/images/Logo_Artifex.svg" alt="" />
            </li>

            <li>
              {" "}
              <img src="elements/home/twiiter.svg" alt="" />
            </li>
            <li>
              {" "}
              <img src="elements/home/Facebook.svg" alt="" />
            </li>
          </ul>
          {/*<button className="LogoutBtn" onClick={logoutHandler}>
            Logout
            </button>*/}
        </div>
      </div>
    </>
  );
};

export default Home;
