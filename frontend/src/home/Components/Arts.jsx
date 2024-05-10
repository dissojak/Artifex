import React, { Fragment, useContext, useEffect, useState } from "react";

import "./Arts.css";

import Art from "../../assets/images/image_artwork.png";
import ArtsList from "./ArtsList";

import { toast } from "react-toastify";
import { useGetArtworksMutation } from "../../slices/artworksSlice";

const Arts = () => {
  const [artworks, setArtworks] = useState();
  const [getArtworks, { isLoading }] = useGetArtworksMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getArtworks();
        console.log("adem");
        console.log(responseData);
        setArtworks(responseData.data.artworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  return (
    <Fragment>
      <br />
      <div id="HomeContainerClinet">
        {/* <div className="backgroundLineArtsContainer">
        <img src="./elements/line.svg" className="backgroundLineArts" alt="" />
      </div> */}
        <div className="auth-section2">
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>Art Showcase</h1>
          <p>Discover Exquisite Artworks from Talented Artist</p>
        </div>
        {isLoading && (
          <div className="center_spinner">
            {/* <LoadingSpinner /> */}
            <img src="./elements/11a.gif" alt="" />
          </div>
        )}
        {!isLoading && artworks && <ArtsList items={artworks} />}
      </div>
    </Fragment>
  );
};

export default Arts;
