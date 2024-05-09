import React, { Fragment, useContext } from "react";

import "./Arts.css";

import Art from "../../assets/images/image_artwork.png";
import ArtsList from "./ArtsList";
const Artworks = [
  {
    id: 1,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 2,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 3,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 4,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 5,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 6,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 7,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 8,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 9,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 10,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
];
const isLoading = false;
const Arts = () => {
  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <Fragment>
      <br />
      <div id="HomeContainerClinet">
      {/* <div className="backgroundLineArtsContainer">
        <img src="./elements/line.svg" className="backgroundLineArts" alt="" />
      </div> */}
      <div className="auth-section2">
        <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>Art Showcase</h1>
        <p>Discover Exquisite Artworks from Talented Artist</p>
      </div>
      {isLoading && (
        <div className="center_spinner">
          {/* <LoadingSpinner /> */}
          <img src="./elements/11a.gif" alt="" />
        </div>
      )}
      {!isLoading && Artworks && <ArtsList items={Artworks} />}
      </div>
    </Fragment>
  );
};

export default Arts;
