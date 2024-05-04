import React from 'react';
import './imagestars2.css';
import Banner3 from '../../assets/images/image 2.png'; // Ensure the path is correct

function imagestars2() {
  return (
    <div className="card-container">
      <div className="image-container">
      <div className="special-wrapper">
      <div className="special-box">
        <img src={Banner3} alt="" /> 
        <div className="special-info">
          <h2>Person Name</h2>
          <p></p>
          <div className="special-rating2">
            <input value="5" name="rating" id="special-star5" type="radio" />
            <label htmlFor="special-star5"></label>
            <input value="4" name="rating" id="special-star4" type="radio" />
            <label htmlFor="special-star4"></label>
            <input value="3" name="rating" id="special-star3" type="radio" />
            <label htmlFor="special-star3"></label>
            <input value="2" name="rating" id="special-star2" type="radio" />
            <label htmlFor="special-star2"></label>
            <input value="1" name="rating" id="special-star1" type="radio" />
            <label htmlFor="special-star1"></label>
          </div>
          
        </div>
      </div>
    </div>
      </div>
      <div className='info-container'>
        <h2>Discover Unique Artwork Online</h2>
        <p>Explore curated collections and find the perfect piece for your home or office. Our marketplace connects you with talented artists from around the world.</p>
       
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
