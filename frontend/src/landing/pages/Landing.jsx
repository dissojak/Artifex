import React from "react";
import './Landing.css'
import { Link } from "react-router-dom";

const Landing = () => {
 
  return (
    <>
      <h1>Landing</h1>
      <Link to="/login" className="signupBtn">sign in</Link>
    </>
  );
};

export default Landing;
