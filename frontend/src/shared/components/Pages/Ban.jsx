import React, { useContext } from "react";
import "./Ban.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Ban = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Link to="/">
        <img src="elements/logo_white.svg" alt="" className="Logowhite" />
      </Link>
      <div id="ban1">
        <img src="elements/img_Banned.svg" alt="" className="imgbanned" />
        <div id="flou">
          <div id="ban2">
            <img src="elements/Banned_Alert.svg" alt="" className="alert" />
            <h1 className="suspended">Account Suspended</h1>
            <div id="sahara-ban">sahara</div>
            <p className="p1">
              Your account has been suspended due to a violation of our terms
              and rules.
            </p>
            <p className="p2">
              We take these violations seriously to ensure a fair and respectful
              community.
            </p>
            <p className="p3">
              If you believe this is in error, please contact us for a review.
              Thank you.
            </p>
          </div>
        </div>
      </div>
      <button className="understand" onClick={auth.logout}>
        I understand
      </button>
    </>
  );
};

export default Ban;
