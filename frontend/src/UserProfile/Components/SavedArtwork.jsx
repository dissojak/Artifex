import React, { useEffect, useState } from "react";
import "./SavedArtwork.css";
import Art from "../../assets/images/image_artwork.png";
import loading from "../../assets/images/loadpurple.gif";

import heart from "../../assets/images/heart.png";
import eye from "../../assets/images/eye.png";
import { useGetSavedArtworksMutation } from "../../slices/likeSaveSlice";
import { toast } from "react-toastify";
import ArtsList from "../../home/Components/ArtsList";
const SavedArwork = () => {
  const [artworks, setArtworks] = useState();
  const [getSavedArtworks, { isLoading }] = useGetSavedArtworksMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getSavedArtworks().unwrap();
        // console.log("adem");
        const populatedArtworks = responseData.savedArtworks.map(
          (item) => item.artworkId
        );
        console.log(populatedArtworks);
        setArtworks(populatedArtworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  return (
    <div className="savedartwork-container">
      <div id="LikedArtworksContainerClinet">
        {isLoading && (
          <div className="center_spinner">
            <img src={loading} alt="" />
          </div>
        )}
        {/* <div className="likedContainer"> */}
        {!isLoading && artworks && <ArtsList items={artworks} />}
      </div>
      {/* </div> */}
    </div>
  );
};

export default SavedArwork;
