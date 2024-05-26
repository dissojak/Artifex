import React, { Fragment, useEffect, useState } from "react";
import { useGetLikedArtworksMutation } from "../../slices/likeSaveSlice";
import loading from "../../assets/images/loadpurple.gif";
import "./LikedArtworks.css"
import ArtsList from "../../home/Components/ArtsList";
import { toast } from "react-toastify";


const LikedArtworks = () => {
  const [artworks, setArtworks] = useState();
  const [getLikedArtworks, { isLoading }] = useGetLikedArtworksMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getLikedArtworks().unwrap();
        const reversedArtworks = responseData.likedArtworks.map(item => item.artworkId).reverse();
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
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>Artworks You Liked</h1>
        </div>
        {isLoading && (
          <div className="center_spinner">
            <img src={loading} alt="" />
          </div>
        )}
        {/* <div className="likedContainer"> */}
        {!isLoading && artworks && <ArtsList items={artworks} />}
        </div>
      {/* </div> */}
    </Fragment>
  );
};

export default LikedArtworks;
