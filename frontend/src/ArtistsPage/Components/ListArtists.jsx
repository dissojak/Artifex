import React from "react";
import "../Pages/Artists.css";
import ArtistCardItem from "./ArtistCardItem";

const ListArtists = (props) => {
  return (
    <div className="Artists-container">
      {props.items.map((artist) => (
        <ArtistCardItem
          museum={props.museum}
          key={artist.id||artist._id}
          id={artist.id||artist._id}
          image={artist.profileImage}
          username={artist.username}
          plan={artist.plan}
          category={artist.category}
          rating={artist.rating?.rating || 0} // Use optional chaining and default value
          reviews={artist.rating?.nbReviews || 0} // Use optional chaining and default value
          numberOfArtworks={artist.numberOfArtworks||(props.museum&&'Hiden')||0}
          numberOfFollowers={artist.numberOfFollowers || 0}
          isFollowing={artist.isFollowing}
          instagram={artist.instagram}
          twitter={artist.twitter}
          linkedin={artist.linkedin}
          phoneNumber={artist.phone_number}
        />
      ))}
    </div>
  );
};

export default ListArtists;
