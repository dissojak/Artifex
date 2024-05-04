import React, { useContext } from "react";

import "./Arts.css";

import Art from "../assets/images/image_artwork.png";

import heart from "../assets/images/heart.png";
import eye from "../assets/images/eye.png";
const Arts = () => {
 

  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
    <br />
    <div id="homearts">
    <div className="auth-section2">
    <h1 style={{fontWeight:'bold',fontSize:'40px'}}>Art Showcase</h1>
    <p>Discover Exquisite Artworks from Talented Artist</p>
  </div>
<div className="gallery-container2">
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        <div  className="cardd">
          <img src={Art} alt="" className="card-image" />
          <div className="card-body">
            <h5 className="card-title">The Moon</h5>
            <p className="card-text">12.99 DT</p>
           
            <button class="CartBtn">
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text">Add to Cart</p>
</button>
            <div className="card-footer">
              <span className="author">Adem Ben Amor</span>
              <div style={{width:'15px',height:'15px'}}>
      <input type="checkbox" id="checkboxInput" className="checkbox-input" />
      <label htmlFor="checkboxInput" className="bookmark">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon">
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
        </svg>
      </label>
    </div>
    <p> </p>
    <img src={heart} style={{width:'15px',height:'15px'}} alt='heart' />
              <span className="likes">77 Likes </span>
              <img src={eye} style={{width:'15px',height:'15px'}} alt='eye' />
              <span className="views">10.7K</span>
            </div>
          </div>
        </div>
        </div>
        
       
</div>



    </>
  );
};

export default Arts;
