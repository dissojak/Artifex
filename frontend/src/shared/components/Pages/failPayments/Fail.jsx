import React from 'react';
import './Fail.css';
import Faield from "../../../../assets/images/faield.svg";
import { Link } from "react-router-dom";
const Fail = () => {
  return (
    <div id="Payment-Faield-section">
    <div className="payment-failed-container-fail">
    <div className="icon-fail">
      <img src={Faield} alt='faield' />
    </div>
    <h1>Payment failed</h1>
    <p>Something went wrong we couldn’t process your payment, contact our support if you have lost money.</p>
    <Link to="/home">
    <button className="retry-button-fail" >Go Back HomePage</button>
    </Link>
  </div>
  </div> 
  );
}

export default Fail;