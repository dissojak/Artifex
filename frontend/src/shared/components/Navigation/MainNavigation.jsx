import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
// import NavLinks from './NavLinks';
import Nav from "../Nav-barres/Nav";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import { AuthContext } from "../../context/auth-context";
import ErrorModal from "../UIElements/ErrorModal";
import { useHttp } from "../../hooks/http-hook";

import "./MainNavigation.css";
import "./ProfileNav.css";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttp();
  // const [user, setUser] = useState();

  useEffect(() => {
    const req = async () => {
      if (auth.userId) {
        try {
          const responseData = await sendRequest(
            "http://localhost:8000/api/user/getUserByUserId/" + auth.userId
          );
          // setUser(responseData.user);
          auth.updateProfilePicture(responseData.user.profileImage);
        } catch (e) {}
      }
    };
    req();
    // eslint-disable-next-line
  }, [sendRequest, auth.userId]);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav>
          {/* <NavLinks /> */}
          <Nav />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        ></button>
        <Link to="/">
          <img src="elements/logo.svg" alt="" className="img_header" />
        </Link>
        {/* <NavLinks /> */}
        <Nav />
        {auth.isLoggedIn && (
          <>
            <div id="header_right">
              <button className="button_header_right">
                {" "}
                <img src="elements/Polygone 2.svg" alt="" />
              </button>

              <h1 className="name">{auth.userName}</h1>
              <img
                // it should now be in auth to track it when change ( the profile photo )
                src={auth.profileImage || "elements/default_pdp1.png"}
                alt=""
                className="a"
              />
            </div>
          </>
        )}
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
