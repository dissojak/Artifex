import React from 'react';
import ArtsItem from '../../shared/components/UIElements/ArtsItemCard';
import "../../Collection/Components/CollectionList.css";

const CardList = (props) => {
  // console.log(props.collection);
  return (
    <>
      <div className="gallery-container2">
        {props.collection.map(artwork => (
        <ArtsItem
          passKey={true}
          inCard={true}
          key={artwork._id}
          id={artwork._id}
          Image={artwork.imageArtwork}
          username={artwork.Artist}
          Likes={artwork.Likes}
          Views={artwork.Views||0}
          title={artwork.title}
          price={artwork.price}
          onDelete={props.deleteItemById}
          artistId={artwork.id_artist._id}
        //   rating={artwork.rating.rating||0}
        />
      ))}
      </div>
    </>
  );
}

export default CardList;