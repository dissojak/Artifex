import React from "react";
import "../../../../home/Components/Arts.css";
import ArtsAdminItem from "../../../../shared/components/UIElements/ArtsItemAdminCard";
const ArtsAdminList = (props) => {
  return (
    <>
      <div className="gallery-container2">
        {props.items.map((artwork) => (
          <ArtsAdminItem
            key={artwork._id}
            id={artwork._id}
            Image={artwork.imageArtwork}
            description={artwork.description}
            title={artwork.title}
            price={artwork.price}
            onDelete={props.deleteItemById}
            // status={artwork.status}
          />
        ))}
      </div>
    </>
  );
};

export default ArtsAdminList;
