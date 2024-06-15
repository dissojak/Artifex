import React, { Fragment, useEffect, useState } from "react";
import { useGetLikedArtworksMutation } from "../../slices/likeSaveSlice";
import loading from "../../assets/images/loadpurple.gif";
import "./LikedArtworks.css";
import ArtsList from "../../home/Components/ArtsList";
import { toast } from "react-toastify";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton";

const LikedArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [getLikedArtworks] = useGetLikedArtworksMutation();
  useEffect(() => {
    const req = async () => {
      setIsLoading(true);
      const cacheKey = "likedArtworksCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (cache && now - cache.timestamp < oneDay) {
        // Check if cached data is fresh (within 24 hours)
        console.log("cache liked artworks");
        const reversedArtworks = cache.data.map((item) => item.artworkId).reverse();
        setArtworks(reversedArtworks);
        setIsLoading(false);
      } else {
        try {
          const responseData = await getLikedArtworks().unwrap();
          const reversedArtworks = responseData.likedArtworks
            .map((item) => item.artworkId)
            .reverse();
          setArtworks(reversedArtworks);
          console.log(reversedArtworks);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ data: responseData.likedArtworks, timestamp: now })
          );
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          setIsLoading(false);
        }
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
