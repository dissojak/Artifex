import React from 'react';
import './imagestars3.css';
import Banner3 from '../../assets/images/image 3.png'; // Ensure the path is correct

function imagestars3() {
  return (
    <div className="card-container">
      <div className="image-container">
      <div className="special-wrapper">
      <div className="special-box">
        <img src={Banner3} alt="" /> 
        <div className="special-info">
          <h2>Person Name</h2>
          <p></p>
          <div className="special-rating">
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
      <p style={{ color: "#5BD6FF",fontWeight:'bold' }}>Discover</p>
        <h2> Delve Into Our <br />
          Exclusive Collections</h2>
        <p>  Premier destination for both art enthusiasts and creators alike.
              We boast an impressive array of exclusive collections, carefully
              curated to showcase the finest talents within the industry.Museums
              serves as a testament to the diversity and boundless creativity of
              our artists.</p>
        
      </div>
    </div>
  );
}

export default imagestars3;
