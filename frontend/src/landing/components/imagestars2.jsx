import React from 'react';
import './imagestars2.css';
import Banner3 from '../../assets/images/image 2.png'; // Ensure the path is correct
import UserProfile from './UserProfile.jsx'
function imagestars2() {
  return (
    <div className="card-container">
      <div className="image-container">
      <div className="special-wrapper">
      <div className="special-box" style={{height:'447px'}}>
        <img src={Banner3} alt="" /> 
        <div className="special-info">
          <UserProfile />
          <p></p>
          <div className="special-rating2">
            <input value="star5" name="rating" id="star5" type="radio" />
            <label htmlFor="star5"></label>
            <input value="star4" name="rating" id="star4" type="radio" />
            <label htmlFor="star4"></label>
            <input value="star3" name="rating" id="star3" type="radio" />
            <label htmlFor="star3"></label>
            <input value="star2" name="rating" id="star2" type="radio" />
            <label htmlFor="star2"></label>
            <input value="star1" name="rating" id="star1" type="radio" />
            <label htmlFor="star1"></label>
          </div>
          
        </div>
      </div>
    </div>
      </div>
      <div className='info-container' style={{paddingTop:'50px'}}>
        <h2>Discover Unique Artworks from 
Talented Artists on Artifex 
Marketplace</h2>
        <p>Explore our curated collection of featured artworks and bestsellers. Purchase your favorite pieces directly from the artists.</p>
       
        <div className="containerr">
     <div className="row">
        <div className="column">
          <h2 className="section-title">Featured Artworks</h2>
          <p>Browse through our selection of handpicked artworks, showcasing diverse styles and mediums.</p>
        </div>
        <div className="column">
          <h2 className="section-title">Bestsellers</h2>
          <p>Discover the most popular artworks loved by our community of art enthusiasts.</p>
        </div>
        </div>
  </div>
      </div>
    </div>
  );
}

export default imagestars2;
