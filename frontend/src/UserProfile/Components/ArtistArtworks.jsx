import React, { useState } from "react";
import NewArtworkArtist from "../../shared/components/FormElements/NewArtwork";
import ArtistArtworksList from "./ArtistArtworksList";

const ArtistArtworks = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // console.log("artworks: ", props.artworks);
  return (
    <>
      {!isOpen ? (
        <ArtistArtworksList collection={props.artworks} onOpen={toggleModal}/>
      ) : (
        <NewArtworkArtist onClose={toggleModal} onAjout={props.onAjoutArtwork} />
      )}
    </>
  );
};

export default ArtistArtworks;
