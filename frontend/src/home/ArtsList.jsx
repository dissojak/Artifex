import React from "react";
import "./Arts.css";
import ArtsItem from "./ArtsItem";
const ArtsList = (props) => {
  return (
    <>
      <div className="gallery-container2">
        {props.items.map(artwork => (
        <ArtsItem
          key={artwork.id}
          id={artwork.id}
          Image={artwork.Image}
          username={artwork.Artist}
          Likes={artwork.Likes}
          Views={artwork.Views}
          title={artwork.title}
          price={artwork.price}
        //   rating={artwork.rating.rating||0}
        />
      ))}
      </div>
    </>
  );
};

export default ArtsList;
