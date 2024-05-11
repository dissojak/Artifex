import React from "react";
import "./Details.css";
const Details = () => {
  return (
    <div className="artwork-details">
      <h1>Artwork Name</h1>
      <p className="price">1500 DT</p>
      <div className="ratingArtworkDetailsContainer">
        <div className="ratings">
          <div className="special-rating-commentsection">
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
        <p className="ratings">(4.2 stars) - 12 rating</p>
      </div>
      <p className="description">
        Uncover hidden talents and support up-and-coming artists. Our platform
        showcases a diverse range of artists, giving you the opportunity to find
        unique and innovative artwork.
      </p>
      <div className="ratingArtworkDetailsContainer">
        <p className="category" style={{color:"#9866FF",fontWeight: "bold"}}>Category: </p>
        <p className="category">Digital art</p>
      </div>
      <div className="buttonsartsection">
        <div className="buttoncart">
          <div className="button-wrappercart">
            <div className="textcart">Add To Cart</div>
            <span className="iconcart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-cart2"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="buttoncmt" data-tooltip="Price: 15DT">
          <div className="button-wrappercmt">
            <div className="textcmt">Buy Now</div>
            <span className="iconcmt">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-cart2"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
