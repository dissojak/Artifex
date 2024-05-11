import React from 'react';
import './imagestars3.css';
import Banner3 from '../../assets/images/image 3.png'; // Ensure the path is correct

function imagestars3() {
  return (
    <div className="card-container3">
      <div className="image-container">
      <div className="special-wrapper">
      <div className="special-box">
        <img src={Banner3} alt="" /> 
       
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
