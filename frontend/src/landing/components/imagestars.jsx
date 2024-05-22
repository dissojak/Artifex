import React from 'react';
import './imagestars.css';
import Banner3 from '../../assets/images/image 1.png'; // Ensure the path is correct
import UserProfile from './UserProfile.jsx'

function imagestars() {
  return (
    <div className="card-container">
      <div className="image-container">
      <div className="special-wrapper">
      <div className="special-box" style={{height:'447px'}}>
        <img className="Wallpaper" src={Banner3} alt="" /> 
        <div className="special-info">
       <UserProfile />
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
      <div className='info-container' style={{paddingTop:'46px'}}>
        <h2>Discover Unique Artwork Online</h2>
        <p>Explore curated collections and find the perfect piece for your home or office. Our marketplace connects you with talented artists from around the world.</p>
        <h2>Secure Online Purchasing</h2>
        <p>Shop with confidence knowing that your transactions are protected. Our secure platform ensures a safe and seamless purchasing experience.</p>
        <h2>Discover Emerging Artists</h2>
        <p>Uncover hidden talents and support up-and-coming artists. Our platform showcases a diverse range of artists, giving you the opportunity to find unique and innovative artwork.</p>
      </div>
    </div>
  );
}

export default imagestars;
