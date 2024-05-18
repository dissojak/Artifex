import React, { useEffect, useState } from "react";
import "./ArtistParticipitant.css";
import ListArtists from "../../ArtistsPage/Components/ListArtists";
const ArtistParticipitant = (props) => {
  console.log(props.artists);
  return (
    <>
      <div id="ArtistParticipant-section">
        <div className="ArtistParticipant-section2">
          <h1>GUESTS ARTISTS :</h1>
          <ListArtists items={props.artists} museum={true}/>
        </div>
      </div>
    </>
  );
};

export default ArtistParticipitant;
