import React from 'react';
import ArtsItemCollection from '../../shared/components/UIElements/ArtsItemCardCollection';

const CollectionList = (props) => {
  return (
    <>
      <div className="gallery-container2">
        {props.collection.map(artwork => (
        <ArtsItemCollection
          passKey={true}
          collection={true}
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
}

export default CollectionList;