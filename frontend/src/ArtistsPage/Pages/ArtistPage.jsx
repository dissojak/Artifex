import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import "./Artists.css";
import ListArtists from "../Components/ListArtists.jsx";
import { useGetArtistsMutation } from '../../slices/artistsSlice.js';
import { setCredentials } from '../../slices/authSlice.js';
import { toast } from "react-toastify";
import loading from "../../assets/images/loadpurple.gif";

const ArtistPage = () => {
  const [artists, setArtists] = useState();

  // const { userInfo } = useSelector((state) => state.auth);

  const [getArtists, { isLoading }] = useGetArtistsMutation();


  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getArtists();
        setArtists(responseData.data.artists);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  },[]);

  const SkeletonLoader = () => {
    return (
      <div className="skeleton-loader">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text small"></div>
      </div>
    );
  };  

  return (
    <>
      <div className="ArtistPage-container">
        <div id="Artists-section">
          <div className="Artists-section2">
            <p style={{ color: "#FD006F", fontWeight: "bold" ,marginBottom: '1rem' }}>Discover</p>
            <h1 style={{ fontWeight: "bold", fontSize: "40px",marginBottom: '2rem' }}>
              Meet Our Artists
            </h1>
            <p>Get to know the passionate individuals behind Artifex.</p>
          </div>
          {isLoading && (
            <div className="center_spinner" style={{position:'relative',top:'4rem'}}>
              {/* <SBLoader className="Overlay"/> */}
              {/* <LoadingSpinner /> */}
              {/* <img src="./elements/11a.gif" alt="" /> */}
              <img src={loading} alt="" />

              {/* <SkeletonLoader /> */}
            </div>
          )}
          {!isLoading && artists && <ListArtists items={artists}/>}
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
