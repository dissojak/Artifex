import React, { useEffect, useState } from "react";
import "./Showcase.css";
import {
  useGetMuseumByIdMutation,
  useIsParticipantMutation,
} from "../../slices/museumsSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex";
import defaultImg from "../../assets/images/Museum.png";
import { useSelector } from "react-redux";

const Showcase = () => {
  const { museumId } = useParams();
  const navigate = useNavigate();
  const [museum, setMuseum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [getMuseum] = useGetMuseumByIdMutation();
  const [inDateRange, setInDateRange] = useState(null);
  const [isParticipation, setIsParticipation] = useState(null);
  const [checkIsParticipant] = useIsParticipantMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const isClient = userInfo.userType === "client";
  const isArtist = userInfo.userType === "artist";

  useEffect(() => {
    const req0 = async () => {
      try {
        setIsLoading(true);
        const res = await checkIsParticipant(museumId).unwrap();
        console.log("isParticipation :", res);
        setIsParticipation(res.isParticipant);
        console.log("isParticipation : ", res.isParticipant);
        !res.isParticipant && navigate("/noAuthorization");
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      }
    };

    if (isParticipation === null) {
      req0();
    }
    const req = async () => {
      try {
        setIsLoading(true);
        const res = await getMuseum(museumId).unwrap();
        console.log(res.museum);
        setMuseum(res.museum);
        const today = new Date();
        const dateStart = new Date(res.museum.dateStart);
        const dateEnd = new Date(res.museum.dateEnd);
        const inRange = today >= dateStart && today <= dateEnd;
        !inRange && navigate("/noAuthorization");
        setInDateRange(today >= dateStart && today <= dateEnd);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      }
    };
    if (isParticipation) {
      req();
    }
  }, [isParticipation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <LoadingArtifex />
  ) : (
    <>
      {/* <div className="ShowcaseMusartist-Banner"></div> */}
      <div className="ShowcaseMusartist-container">
        <img
          src={museum?.museumImage}
          alt=""
          className="MuseumShowCaseImageBanner"
        />
        <div className="ShowcaseMusartist-name">
          {" "}
          <p>{museum?.title}</p>{" "}
        </div>
        <h1 className="ShowcaseMusartist-title">Museum Showcase</h1>
        <p className="ShowcaseMusartist-details">
          Special Artworks Only On Our Museums
        </p>
      </div>
    </>
  );
};

export default Showcase;
