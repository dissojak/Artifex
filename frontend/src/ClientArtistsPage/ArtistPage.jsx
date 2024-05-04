import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import "./Artists.css";
import ListArtists from "./ListArtists.jsx";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { useGetArtistsMutation } from '../slices/artistsSlice.js';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ArtistPage = () => {
  const [artists, setArtists] = useState();

  const dispatch = useDispatch();

  // const { userInfo } = useSelector((state) => state.auth);

  const [getArtists, { isLoading }] = useGetArtistsMutation();


  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getArtists();
        dispatch(setCredentials(responseData));
        setArtists(responseData.data.artists);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  },[]);
  return (
    <>
      <div className="ArtistPage-container">
        <div id="Artists-section">
          <div className="Artists-section2">
            <p style={{ color: "#FD006F", fontWeight: "bold" }}>Discover</p>
            <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>
              Meet Our Artists
            </h1>
            <p>Get to know the passionate individuals behind Artifex.</p>
          </div>
          {isLoading && (
            <div className="center_spinner">
              {/* <SBLoader className="Overlay"/> */}
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && artists && <ListArtists items={artists}/>}
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
