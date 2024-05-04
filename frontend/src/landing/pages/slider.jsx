import React, { useState, useEffect } from 'react';
import "./slider.css";

import Slide1 from "../../assets/images/slider1.png";
import Slide2 from "../../assets/images/slider2.png";
import Slide3 from "../../assets/images/slider3.png";
import Slide4 from "../../assets/images/slider4.png";
import Slide5 from "../../assets/images/slider5.png";
import Slide6 from "../../assets/images/slider6.png";
import Slide7 from "../../assets/images/slider7.png";
const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];
const slideTexts = [
  "Discover And Support Talented Artists on Artifex",
  "Explore new artistic horizons",
  "Connect with a world of creativity",
  "Find unique pieces for every style",
  "Invest in artwork that inspires",
  "Discover your next favorite artist",
  "Support artists and their craft"
];

const slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div id="slidercont">
    <div className="slider-container">
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide}  alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="info">
        <h2 style={{color:'#7E3FFF',fontSize:'50px'}}>{slideTexts[currentSlide]}</h2>
        <p>Artifex is a vibrant artist marketplace where creativity thrives and community connects.</p>
        <button className="signup-button-slider">SIGN UP</button>
      <button className="login-button-slider">LOGIN</button>
      </div>
      {/*
      <button onClick={prevSlide} className="slide-btn prev-btn">Prev</button>
      <button onClick={nextSlide} className="slide-btn next-btn">Next</button>
        */}
    </div>
    </div>
  );
};

export default slider;
