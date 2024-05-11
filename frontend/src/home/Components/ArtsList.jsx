import React from "react";
import "./Arts.css";
import ArtsItem from "../../shared/components/UIElements/ArtsItemCard";
const ArtsList = (props) => {
  return (
    <>
      <div className="gallery-container2">
        {props.items.map(artwork => (
        <ArtsItem
          passKey={true}
          key={artwork._id}
          id={artwork._id}
          Image={artwork.imageArtwork}
          username={artwork.Artist}
          Likes={artwork.Likes}
          Views={artwork.Views||0}
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
