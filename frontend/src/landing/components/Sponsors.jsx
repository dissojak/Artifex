import React from 'react';
import './Sponsors.css';

// Import your logos here
import HVHLogo from '../../assets/images/logohvh.png';
import Reactlogo from '../../assets/images/reactlogo.png';
import Mongodblogo from '../../assets/images/mongodblogo.png';
import nodejslogo from '../../assets/images/nodejslogo.png';
import expresslogo from '../../assets/images/expresslogo.png';
import githublogo from '../../assets/images/githublogo.png';
import GoldenFruitsLogo from '../../assets/images/GoldenFruitsLogo.png';
import logoStoonProd from '../../assets/images/logostoonprodREC.png';
import logoStoon from '../../assets/images/AAA_STOOOON.png';
const Sponsors = () => {
  return (
    <div className="sponsors-container">
      <h2>Our Sponsors</h2>
      <p>We are thankful to each and every company sponsored our platform which helped us to continue working on it.</p>
      <div className="logos">
        {/* <img src={Reactlogo} alt="Reactlogo" /> */}
        {/* <img src={Mongodblogo} alt="Mongodblogo" /> */}
        {/* <img src={nodejslogo} alt="nodejslogo" /> */}
        {/* <img src={expresslogo} alt="expresslogo" /> */}
        <img src={logoStoonProd} alt="logoStoonProd" />
        <img src={HVHLogo} alt="HVHLogo" />
        <img src={logoStoon} alt="logoStoon" />
        <img src={GoldenFruitsLogo} alt="GoldenFruitsLogo" />
        <img src={githublogo} alt="githublogo" />
      </div>
    </div>
  );
};

export default Sponsors;
