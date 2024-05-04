import React from "react";
import "./Artists.css";
import ArtistCardItem from "./ArtistCardItem";
const dummyData = [{ name: "adem ben amor" }];
const ListArtists = (props) => {
  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
      <div className="Artists-container">
        {props.items.map(artist => (
        <ArtistCardItem
          key={artist.id}
          id={artist.id}
          image={artist.profileImage}
          username={artist.username}
          plan={artist.plan}
          category={artist.category}
          rating={artist.rating.rating||0}
          reviews={artist.rating.nbReviews||0}
          numberOfArtworks={artist.numberOfArtworks}
          numberOfFollowers={artist.numberOfFollowers||0}
          isFollowing={artist.isFollowing}
          instagram={artist.instagram}
          twitter={artist.twitter}
          linkedin={artist.linkedin}
          phoneNumber={artist.phone_number}
        />
      ))}
      </div>
    </>
  );
};

export default ListArtists;
