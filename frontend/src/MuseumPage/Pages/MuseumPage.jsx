import React from "react";
import './MuseumPage.css';
import Introduction from '../Components/Introduction.jsx';
import Museums from '../Components/Museums/Pages/Museums.jsx';

const MuseumPage = () => {
  return (
    <div className="MuseumPage-container">
   
      <Introduction />
      <Museums />
      
    </div>
  );
};

export default MuseumPage;
