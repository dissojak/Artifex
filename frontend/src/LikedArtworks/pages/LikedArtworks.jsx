import React, { Fragment, useEffect, useState } from "react";
import { useGetLikedArtworksMutation } from "../../slices/likeSaveSlice";
import loading from "../../assets/images/loadpurple.gif";
import "./LikedArtworks.css";
import ArtsList from "../../home/Components/ArtsList";
import { toast } from "react-toastify";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton";

const LikedArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [getLikedArtworks, { isLoading }] = useGetLikedArtworksMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getLikedArtworks().unwrap();
        const reversedArtworks = responseData.likedArtworks
          .map((item) => item.artworkId)
          .reverse();
        setArtworks(reversedArtworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  return (
    <Fragment>
      <div id="LikedArtworksContainerClinet">
        <div className="auth-section2-LikedArtworks">
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>
            Artworks You Liked
          </h1>
        </div>
        {isLoading && (
          // <div className="center_spinner">
          //   <img src={loading} alt="" />
          // </div>
          <div className="Collection-container">
            <div className="art-skeleton-container">
              {Array.from({ length: 8 }, (_, index) => (
                <ArtworkSkeleton key={index} />
              ))}
            </div>
          </div>
        )}
        {artworks.length === 0 ? (
          <h1 className="no-artworks">You Didn't Liked Any Artwork Yet !</h1>
        ) : (
          <>{!isLoading && artworks && <ArtsList items={artworks} />}</>
        )}
      </div>
    </Fragment>
  );
};

export default LikedArtworks;
