import React from "react";
import "./Arts.css";
import ArtsItem from "../../shared/components/UIElements/ArtsItemCard";
const ArtsHomeList = (props) => {
    const X_Items = props.items.slice(0, props.numberOfItems);
  return (
    <>
      <div className="gallery-container2">
        {X_Items.map(artwork => (
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

export default ArtsHomeList;
