import React from 'react';
import ArtsItem from '../../shared/components/UIElements/ArtsItemCard';
import "../../Collection/Components/CollectionList.css";

const CardList = (props) => {
  {props.collection.map(artwork => (console.log(artwork.imageArtwork)))}
  console.log("this " ,props.collection)
  return (
    <>
      <div className="gallery-container2">
        {props.collection.map(artwork => (
        <ArtsItem
          passKey={true}
          collection={true}
          key={artwork._id}
          id={artwork._id}
          Image={artwork.ImageArtwork}
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
}

export default CardList;