import React from 'react';
import './TeamBehind.css'; // Make sure to create a corresponding CSS file
import Tarek from '../../assets/images/tarek.png';
import Adem from '../../assets/images/adem.png';


const TeamBehind = () => {
  return (
    <div className="services-section">
      <h1 style={{fontFamily:'Arial, sans-serif',fontWeight:'bold'}}>Current</h1>
      <p>Discover the team behind Artifex . Hire us to make your own website !</p>
      <br />
      <div className="services-container">
      
      <div className="card2">
  <img
    className="card2-photo"
    alt="User profile man"
    src={Adem}
  />
  <div className="card2-title">
    Adem Ben Amor <br />
    <span>Fullstack dev &amp; UX UI</span>
  </div>
  <div className="card2-socials">
    <a href='https://www.facebook.com/dissojak' className="card2-socials-btn facebook">
      <svg
     
      >
        <title></title>
        <path
          d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"
        ></path>
      </svg>
    </a>
    <a href="https://github.com/dissojak" className="card2-socials-btn github" role="button">
  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
  </svg>
</a>

    <a href='https://www.linkedin.com/in/adembenamor/' className="card2-socials-btn linkedin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        viewBox="0 0 512 512"
        height="512"
      >
        <path
          d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"
        ></path>
      </svg>
    </a>
  </div>
</div>
<div className="card2">
  <img
    className="card2-photo"
    alt="User profile man"
    src={Tarek}
  />
  <div className="card2-title">
    Tarek Chebbi<br />
    <span>Fullstack dev &amp; UX UI</span>
  </div>
  <div className="card2-socials">
    <a href='https://www.facebook.com/tarek.chebbi.71/' className="card2-socials-btn facebook">
      <svg>
   
        <title></title>
        <path
          d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"
        ></path>
      </svg>
    </a>
    <a href='https://github.com/TarekChebbi' className="card2-socials-btn github">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        ></path>
      </svg>
    </a>
    <a href='https://www.linkedin.com/in/tarek-chebbi/' className="card2-socials-btn linkedin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        viewBox="0 0 512 512"
        height="512"
      >
        <path
          d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"
        ></path>
      </svg>
    </a>
  </div>
</div>
      </div>
    </div>
  );
};

export default TeamBehind;
