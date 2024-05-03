import React, { useState, useEffect } from 'react';
import "./slider2.css";

import Slide1 from "../../assets/images/2slider.png";
import Slide2 from "../../assets/images/2slider1.png";
import Slide3 from "../../assets/images/2slider2.png";
import Slide4 from "../../assets/images/2slider3.png";
import Slide5 from "../../assets/images/2slider4.png";
import Slide6 from "../../assets/images/2slider5.png";
import Slide7 from "../../assets/images/2slider6.png";
const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7];
const slideTexts = [
  " Discover Art in Various Categories on our Marketplace",
  "Step Into a World of Exceptional Artistry",
  "Embark on a Journey of Artistic Discovery",
  "Explore the Essence of Creativity in Modern Art",
  "Art That Tells a Story, Engages, and Inspires",
  "Reimagine Your World Through Art",
  "Transform Spaces with Visionary Works"
];

const slider2 = () => {
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
    <div id="slider2cont">
    <div className="slider-container">
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="info2">
        <h2 style={{color:'#7E3FFF',fontSize:'50px'}}>{slideTexts[currentSlide]}</h2>
        <p> Browse through a wide selection of paintings, sculptures,
                digital art, and more on our marketplace.</p>
      </div>
      {/*
      <button onClick={prevSlide} className="slide-btn prev-btn">Prev</button>
      <button onClick={nextSlide} className="slide-btn next-btn">Next</button>
        */}
    </div>
    </div>
  );
};

export default slider2;
