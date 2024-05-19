import React, { useContext } from "react";

import "./Introduction.css";
// import Hackatons from "../../../hackaton/Pages/Hacktons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

import Facebook from "../../assets/images/Facebook.svg";
import Instagram from "../../assets/images/Instagram.svg";
import Twitter from "../../assets/images/Tracé 2.svg";
import Youtube from "../../assets/images/youtube.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import Logo from "../../assets/images/Logo_Artifex.svg";

const Introduction = () => {
  const auth = useContext(AuthContext);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

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
      <div id="museum">
        <div id={auth.isAdmin ? "home2-admin" : "home2"}>
          <h1
            className="where"
            style={!auth.isAdmin ? { color: "#5BD6FF" } : { color: "#5BD6FF" }}
          >
            Where Every Brushstroke{" "}
          </h1>
          <h1 className="meets">Tells a Story</h1>
          <p className="p1">
            "Explore the Rich Tapestry of Human Creativity. At Artifex Museums,
            we invite you to embark on a journey through time, where every
            exhibit unveils new dimensions of imagination and unlocks the
            boundless potential of human expression."
          </p>
          {userInfo.userType === "client" ? (
            <button
              className="button_home"
              onClick={() =>
                (window.location.href = "mailto:StoonProduction@gmail.com")
              }
            >
              <h2
                className="button_home_1"
                style={
                  !auth.isAdmin ? { color: "black" } : { color: "#0185B7" }
                }
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
              {/* <img src="elements/arrow.svg" alt="" className="arrow"/> */}
              <img
                src={
                  !auth.isAdmin ? "elements/arrow.svg" : "elements/arrow.svg"
                }
                alt=""
                className="arrow"
                style={{ padding: "9px 0", color: "black" }}
              />
            </button>
          ) : (
            <Link to="/Plans">
              <button className="magic-button">
                Get Your Plan
                <div className="star-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                    viewBox="0 0 784.11 815.53"
                  >
                    <g id="Layer_x0020_1">
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="star-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                    viewBox="0 0 784.11 815.53"
                  >
                    <g id="Layer_x0020_1">
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="star-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                    viewBox="0 0 784.11 815.53"
                  >
                    <g id="Layer_x0020_1">
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="star-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                    viewBox="0 0 784.11 815.53"
                  >
                    <g id="Layer_x0020_1">
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="star-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                    viewBox="0 0 784.11 815.53"
                  >
                    <g id="Layer_x0020_1">
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="star-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    style={{
                      shapeRendering: "geometricPrecision",
                      textRendering: "geometricPrecision",
                      imageRendering: "optimizeQuality",
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                    }}
                    viewBox="0 0 784.11 815.53"
                  >
                    <g id="Layer_x0020_1">
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </g>
                  </svg>
                </div>
              </button>
            </Link>
          )}
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
          {/* <button className="LogoutBtn" onClick={logoutHandler}>Logout</button>*/}
        </div>
      </div>

      {/* {auth.isLoggedIn && <Hackatons />} */}
    </>
  );
};

export default Introduction;
