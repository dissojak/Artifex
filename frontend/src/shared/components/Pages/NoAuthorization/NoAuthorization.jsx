import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoAuthorization.css'; // Make sure to create the CSS file
import Error from "../../../../assets/images/403error.jpg";
const NoAuthorization = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/home');
  };

  return (
    <div className="forbidden-403">
    <div className="forbidden-403-content">
      <div className="forbidden-403-header">
        <img src={Error} alt="Error" className="forbidden-403-logo" />
      </div>
      <p style={{fontFamily:'Dubai',fontSize:'25px'}}>You're not permitted to see this.</p>
      <p style={{fontFamily:'Dubai',fontSize:'25px'}}>The page you're trying to access has restricted access.</p>
      <button  className="forbidden-403-button" onClick={handleReturnHome}>Return Home</button>
    </div>
  </div>
  );
};

export default NoAuthorization;
