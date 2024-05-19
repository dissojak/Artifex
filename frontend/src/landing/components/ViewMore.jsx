import React from 'react';
import './ViewMore.css'; // Make sure the CSS file is in the same directory
import { Link } from "react-router-dom";
const ViewMore = () => {
  return (
    
    <div className="auth-section">
    <h2>To View More, Please Login</h2>
    <div className="buttons">
    <Link to="/signup"><button className="signup-button">SIGN UP</button></Link>
    <Link to="/login"><button className="login-button">LOGIN</button></Link>
    </div>
    
  </div>
  
  
  );
};

export default ViewMore;
