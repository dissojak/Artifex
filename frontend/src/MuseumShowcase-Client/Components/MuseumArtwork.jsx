import React from "react";
import "./MuseumArtwork.css";
import Art from "../../assets/images/image_artwork.png";

import heart from "../../assets/images/heart.png";
import eye from "../../assets/images/eye.png";
const Artworks = [
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
  { Image: Art, Artist: "Tarek Chebbi", Likes: "77", Views: "10.7" },
];
const MuseumArtwork = () => {
  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
      <div className="MuseumArtwork-container">
        {Artworks.map((Artwork) => (
          <div className="MuseumArtwork-card">
            <img
              src={Artwork.Image}
              alt=""
              className="MuseumArtwork-card-image"
            />
            <div className="MuseumArtwork-card-body">
              <div className="MuseumArtwork-card-footer">
                <span className="author">{Artwork.Artist}</span>
                <div style={{ width: "15px", height: "15px" }}>
                  <input
                    type="checkbox"
                    id="checkboxInput"
                    className="checkbox-input"
                  />
                  <label htmlFor="checkboxInput" className="bookmark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512"
                      className="svgIcon"
                    >
                      <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                    </svg>
                  </label>
                </div>
                <p> </p>
                <img
                  src={heart}
                  style={{ width: "15px", height: "15px" }}
                  alt="heart"
                />
                <span className="likes">{Artwork.Likes} Likes </span>
                <img
                  src={eye}
                  style={{ width: "15px", height: "15px" }}
                  alt="eye"
                />
                <span className="views">{Artwork.Views}K</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*the end */}
    </>
  );
};

export default MuseumArtwork;
