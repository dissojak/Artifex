import React from 'react';
import './ContactUsSection.css'; // make sure to create a corresponding CSS file

const ContactUsSection = () => {
  return (
    <div className="contact-us-section">
      <div className="contact-us-content">
        <h2 style={{fontFamily:'Dubai-Bold',fontSize:'36px'}}>Still Have Questions?</h2>
        <p style={{fontFamily:'Raleway-Regular',fontSize:'18px'}}>Contact Us For Further Assistance</p>
        <button className="contact-us-button"  onClick={() =>
              (window.location.href = "mailto:ArtifexMarketplace@gmail.com")
            }>
          Contact us → 
        </button>
      </div>
    </div>
  );
};

export default ContactUsSection;
