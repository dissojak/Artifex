import React, { useEffect, useState } from "react";
import "./MuseumDetails.css";
import ArtSection from "../Components/ArtSection.jsx";
import ArtistParticipitant from "../Components/ArtistParticipitant.jsx";
import {
  useGetMuseumByIdMutation,
  useGetParticipantArtistsMutation,
} from "../../slices/museumsSlice.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex.jsx";
import { useSelector } from "react-redux";
const MuseumDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isClient = userInfo.userType === "client";

  const [isLoading, setIsLoading] = useState();
  const { museumId } = useParams();
  const [getMuseum] = useGetMuseumByIdMutation();
  const [museum, setMuseum] = useState();
  const [getArtists] = useGetParticipantArtistsMutation();
  const [artists, setArtists] = useState();

  useEffect(() => {
    const req = async () => {
      try {
        setIsLoading(true);
        const res = await getMuseum(museumId).unwrap();
        setMuseum(res.museum);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
    const request = async () => {
      try {
        setIsLoading(true);
        const res = await getArtists(museumId).unwrap();
        const artistDetails = res.participantArtists.map(artist => artist.participantId);
        console.log("res : ", artistDetails);
        setArtists(artistDetails);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      }
    };
    request();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return isLoading ? (
    <LoadingArtifex />
  ) : (
    <div className="MuseumDetails-container" style={{ marginTop: isClient ? '113vh' : '-15vh' }}>
      {!isLoading && museum && <ArtSection museum={museum} />}
      {isClient && (
        <>
          {!isLoading && artists && <ArtistParticipitant artists={artists} />}
        </>
      )}{" "}
    </div>
  );
};

export default MuseumDetails;
