import React, { useContext } from "react";

import "./Home.css";
import Hackatons from "../hackaton/Pages/Hacktons";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";


import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import Logo from '../assets/images/Logo_Artifex.svg';

const Home = () => {
  const auth = useContext(AuthContext);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };


  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
      <Link to="/">
        <img src={Logo} alt="" className="Logowhite" />
      </Link>
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
          <br/>
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
            />
          </button>

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
          <button className="signupBtn" onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className="article_index">
        <div id="sahara">sahara</div>
      </div>
      {auth.isLoggedIn && <Hackatons />}
    </>
  );
};

export default Home;
