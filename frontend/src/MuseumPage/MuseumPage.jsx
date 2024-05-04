import React from "react";
import './MuseumPage.css';
import Introduction from './Introduction.jsx';
import Museums from './Museums.jsx';

const MuseumPage = () => {
  return (
    <div className="MuseumPage-container">
   
      <Introduction />
      <Museums />
      
    </div>
  );
};

export default MuseumPage;
