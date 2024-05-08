import React from "react";
import "./CommentSection.css";
import Adem from "../../assets/images/Adem.jpg"; 
const comments = [
    { name: 'Hazem Ben Saria', comment: 'Embark on a journey to unlock your creative potential and immerse yourself in a world of artistic excellence with Artifex Museums. Join us in celebrating the transformative power of creativity and the inherent beauty found within unique expressions.', avatar: Adem },
    { name: 'Aziz Drachnowa', comment: 'Artifex Museums: Premier destination for art lovers. Exclusive collections celebrate diversity. Explore one-of-a-kind pieces, unlock creativity, and immerse in artistic excellence.', avatar: Adem },
    { name: 'Fathi Lasmer', comment: 'Embark on a journey to unlock your creative potential and immerse yourself in a world of artistic excellence with Artifex Museums. Join us in celebrating the transformative power of creativity and the inherent beauty found within unique expressions.', avatar: Adem }
  ];
const CommentSection = () => {
  return (
    <div id="CommentSection">
       <div className="artwork-details">
      <h1>Artwork Name</h1>
      <p className="price">1500 DT</p>
      <div className="ratings">
        <span className="stars">★★★★☆</span> (4.2 stars) - 12 ratings
      </div>
      <p className="description">
        Uncover hidden talents and support up-and-coming artists. Our platform showcases a diverse range of artists, giving you the opportunity to find unique and innovative artwork.
      </p>
      <p className="category">Category: Digital art</p>
      <div className="buttonsartsection">
        <button className="add-to-cart">Add To Card</button>
        <button className="buy-now">Buy Now</button>
      </div>
    </div>
    <h1 style={{paddingLeft:'60px',color:'#7e3fff'}}>COMMENTS :</h1>
    <div className="comments-section">
    <div className="comment-input-container">
      <img src={Adem} alt="Samir Lousif" className="user-avatar" />
      <input type="text" placeholder="Comment As Samir Lousif" className="comment-input" />
    </div>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <img src={comment.avatar} alt={comment.name} className="avatar" />
          <div className="comment-content">
            <h4>{comment.name}</h4>
            <p>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CommentSection;