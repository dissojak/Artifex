import React, { useState } from "react";
import "./OrderSection.css";
const OrderSection = () => {
  return (
    <>
    {/*here*/}
    <div className="requestFormWrapper">
      <div className="requestForm">
        <div className="formSection left">
          <h2>Let's get your request ready to send</h2>
          <div className="inputGroup">
            <label htmlFor="artType">What's the type of art you are looking for?</label>
            <input type="text" id="artType" placeholder="e.g Landing Page Design, Portrait Drawing" />
          </div>
          <div className="inputGroup">
            <label>How urgent is your request?</label>
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
          <div className="inputGroup">
            <label htmlFor="category">Pick Category:</label>
            <select id="category">
              <option>Digital Drawing</option>
              <option>Other</option>
            </select>
          </div>
          <div className="inputGroup">
            <label htmlFor="details">Tell us more about the project</label>
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
