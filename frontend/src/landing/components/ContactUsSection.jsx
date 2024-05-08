import React from 'react';
import './ContactUsSection.css'; // make sure to create a corresponding CSS file

const ContactUsSection = () => {
  return (
    <div className="contact-us-section">
      <div className="contact-us-content">
        <h2 style={{fontFamily:'Arial, sans-serif',fontWeight:'bold'}}>Still Have Questions?</h2>
        <p>Contact Us For Further Assistance</p>
        <button className="contact-us-button">
          Contact us →
        </button>
      </div>
    </div>
  );
};

export default ContactUsSection;
