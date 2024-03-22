import React, { useState, useContext } from "react";
// import React, { useState } from "react";
// import "./Nav.css";
import "./Nav_home.css";
import "./Nav_signup.css";
import "./Nav_Connection.css";
import SignupButton from "../UI/Buttons/SignupButton";
import { AuthContext } from "../../context/auth-context";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const auth = useContext(AuthContext);

  const [buttonStates, setButtonStates] = useState({
    home: true,
    signup: false,
    login: false,
  });

  const [buttonStatesLoginMode, setButtonStatesLoginMode] = useState({
    home: true,
    teams: false,
    register: false,
    profile: false,
  });

  // eslint-disable-next-line
  const [isAnimated, setIsAnimated] = useState(false);

  const handleClick = (button, event) => {
    event.preventDefault();
    setButtonStates((prevStates) => {
      const newStates = { ...prevStates };
      Object.keys(newStates).forEach((key) => {
        newStates[key] = key === button;
      });
      console.log(`changing to ${button}...`, newStates);
      return newStates;
    });
  };

  const handleClickLoginMode = (button, event) => {
    event.preventDefault();
    setButtonStatesLoginMode((prevStates) => {
      const newStates = { ...prevStates };
      Object.keys(newStates).forEach((key) => {
        newStates[key] = key === button;
      });
      console.log(`changing to ${button}...`, newStates);
      return newStates;
    });
  };

  // eslint-disable-next-line
  const handleClickBox = () => {
    setIsAnimated(true);
  };

  return (
    <>
      {!auth.isLoggedIn && (
        <ul id="index_nav">
          {!buttonStates.signup ? (
            <>
              {/* 
              // box div for animated selection on nav bar
              <div
                className={`boxSelection ${isAnimated ? "moveAnimation" : ""}`}
              ></div>
              <button onClick={handleClickBox}></button> */}
              <li
                className={buttonStates.home ? "login_selected" : null}
                onClick={(e) => handleClick("home", e)}
              >
                <NavLink to="/" exact>
                  <img src="elements/home.svg" alt="home" className="img" />
                </NavLink>
              </li>
              <li
                style={{ cursor: "pointer" }}
                className={buttonStates.signup ? "signup_selected" : null}
                onClick={(e) => handleClick("signup", e)}
              >
                <NavLink to="/signup" exact>
                  <SignupButton cursorStyle={true} />
                </NavLink>
              </li>
              {/* {!auth.isLoggedIn && ( */}
              <li
                style={{ cursor: "pointer" }}
                className={buttonStates.login ? "login_selected" : null}
                onClick={(e) => handleClick("login", e)}
              >
                <NavLink to="/auth" exact>
                  <img
                    src="elements/login.svg"
                    alt=""
                    className="img"
                    style={{ cursor: "pointer" }}
                  />
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li
                style={{ cursor: "pointer" }}
                className={buttonStates.home ? "login_selected" : null}
                onClick={(e) => handleClick("home", e)}
              >
                <NavLink to="/" exact>
                  <img
                    src="elements/home_blue.svg"
                    alt=""
                    className="img"
                    style={{ cursor: "pointer" }}
                  />
                </NavLink>
              </li>
              <li
                className="signup_selected"
                onClick={(e) => handleClick("signup", e)}
              >
                <NavLink to="/users" exact>
                  <img src="elements/add.svg" alt="" className="img" />
                </NavLink>
              </li>
              <li
                style={{ cursor: "pointer" }}
                className={buttonStates.login ? "login_selected" : null}
                onClick={(e) => handleClick("login", e)}
              >
                <NavLink to="/auth" exact>
                  <img
                    src="elements/login_blue.svg"
                    alt=""
                    className="img"
                    style={{ cursor: "pointer" }}
                  />
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}

      {/* -------------------------Nav Of LoggedIn-------------------------  */}

      {auth.isLoggedIn && !auth.ban && (
        <>
          {!auth.isAdmin && (
            <ul id="navbar">
              <li
                className={buttonStatesLoginMode.home ? "login_selected" : null}
                onClick={(e) => handleClickLoginMode("home", e)}
              >
                <NavLink to="/" exact>
                  <img
                    src="elements/home.svg"
                    alt=""
                    className="img"
                    style={{
                      cursor: buttonStatesLoginMode.home
                        ? "default"
                        : "pointer",
                    }}
                  />
                </NavLink>
              </li>
              <li
                className={
                  buttonStatesLoginMode.teams ? "login_selected" : null
                }
                onClick={(e) => handleClickLoginMode("teams", e)}
              >
                <NavLink to="/users" exact>
                  <img
                    src="elements/Teamwork.svg"
                    alt=""
                    className="img"
                    style={{
                      cursor: buttonStatesLoginMode.teams
                        ? "default"
                        : "pointer",
                    }}
                  />
                </NavLink>
              </li>
              <li
                className={
                  buttonStatesLoginMode.register ? "login_selected" : null
                }
                onClick={(e) => handleClickLoginMode("register", e)}
              >
                <NavLink to="/registred-hackatons" exact>
                  <div className="img">
                    {!buttonStatesLoginMode.register ? (
                      <svg
                        style={{
                          cursor: buttonStatesLoginMode.register
                            ? "default"
                            : "pointer",
                        }}
                        aria-label="Register"
                        className="register-icon"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polygon
                          fill="none"
                          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                    ) : (
                      <svg
                        aria-label="Unregister"
                        className="register-icon"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
                      </svg>
                    )}
                  </div>
                </NavLink>
              </li>
              <li
                className={
                  buttonStatesLoginMode.profile ? "login_selected" : null
                }
                onClick={(e) => handleClickLoginMode("profile", e)}
              >
                <NavLink to="/profile" exact>
                  <img
                    src="elements/profile.svg"
                    alt=""
                    className="img"
                    style={{
                      cursor: buttonStatesLoginMode.profile
                        ? "default"
                        : "pointer",
                    }}
                  />
                </NavLink>
              </li>
              {/* <li>
              <button onClick={auth.logout}>LOGOUT</button>
            </li> */}
            </ul>
          )}
          {auth.isAdmin && (
            <>
                <h1 className="centered-heading">Nav-Bar Of admin</h1>
            </>
          )}
        </>
      )}
      {auth.ban && (
        <>
            <h1 className="centered-heading">YOU ARE BANNED !</h1>
        </>
      )}
    </>
  );
};

export default Nav;
