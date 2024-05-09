import React, { useState } from "react";
import "./OrderSection.css";
const OrderSection = () => {
  return (
    <>
    {/*here*/}
    <div className="requestFormWrapper">
      <div className="requestForm">
        <div className="formSection left">
          <p>Let's get your request ready to send</p>
          <label htmlFor="artType">What's the type of art you are looking for?</label>
          <div className="inputGroup" >
            
            <input style={{height:'70px',width:'543px'}} type="text" id="artType" placeholder="e.g Landing Page Design, Portrait Drawing" />
          </div>
          <label>How urgent is your request?</label>
          <div className="inputGroup">
           
            <div className="radioButtons">
              <input type="radio" id="asap" name="urgency" value="ASAP" />
              <label htmlFor="asap">ASAP</label>
              <input type="radio" id="nextMonth" name="urgency" value="Within the next month" />
              <label htmlFor="nextMonth">Next month</label>
              <input type="radio" id="notYet" name="urgency" value="Not yet" />
              <label htmlFor="notYet">Not yet</label>
            </div>
          </div>
          <button className="buttontest" type="submit">
          Send Request
</button>
        </div>
        <div className="formSection right">
        <label  htmlFor="category">Pick Category:</label>
          <div className="inputGroup" style={{height:'70px',width:'543px'}}>
            
            <select id="category">
              <option>Digital Drawing</option>
              <option>Other</option>
            </select>
          </div>
          <label htmlFor="details">Tell us more about the project :</label>
          <div className="inputGroup">
           
            <textarea id="details" placeholder="Looking to add another landing page to my current Webflow site..."></textarea>
          </div>
        </div>
      </div>
    </div>
     {/*ends*/}
      
    </>
  );
};

export default OrderSection;
