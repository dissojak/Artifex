import React from "react";
import "./ArtistProfileClient.css"; // Assuming styles are in this file

function ArtistProfileClient() {
  return (
    <div className="artist-profile-container">
      <div className="artist-header"></div>
      <div className="artist-info">
        <img
          src="./Images/pdpWork.jpg"
          alt="Adem Ben Amor"
          className="artist-image"
        />
        <h1>Adem Ben Amor</h1>
        <p>Artist</p>
        <p>245 Subscribers | 12 Artwork</p>
        <p>Digital Drawing</p>
        <button className="subscribe-button">Subscribe</button>
      </div>
      <div className="artist-content">
        <div className="artwork-section">
          <h2>Artwork</h2>
          {/* Sample artwork; replicate structure for each artwork */}
          <div className="artwork-item">
            <img src="path_to_artwork.jpg" alt="Artwork Title" />
            <p>Artwork Title</p>
            <span>77 ♥ | 10.7K views</span>
          </div>
        </div>
        <div className="order-section">
          <h2>Order</h2>
          {/* Sample order; replicate structure for each order */}
          <div className="order-item">
            <img src="path_to_order_image.jpg" alt="Order Title" />
            <p>Order Title</p>
            <span>77 ♥ | 10.7K views</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistProfileClient;
