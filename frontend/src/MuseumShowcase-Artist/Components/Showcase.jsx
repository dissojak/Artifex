import React, { useEffect, useState } from "react";
import "./Showcase.css";
import {
  useGetArtworksOfMuseumMutation,
  useGetMuseumByIdMutation,
  useIsParticipantMutation,
} from "../../slices/museumsSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex";
import defaultImg from "../../assets/images/Museum.png";
import { useSelector } from "react-redux";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton";
import Artworktoadd from "./Artworktoadd";
import ArtsList from "../../home/Components/ArtsList";
import NewArtworkArtist from "../../shared/components/FormElements/NewArtwork";

const Showcase = () => {
  const { museumId } = useParams();
  const navigate = useNavigate();
  const [museum, setMuseum] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [getMuseum] = useGetMuseumByIdMutation();
  const [inDateRange, setInDateRange] = useState(null);
  const [isParticipation, setIsParticipation] = useState(null);
  const [checkIsParticipant] = useIsParticipantMutation();
  const [getArtworks] = useGetArtworksOfMuseumMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const isClient = userInfo.userType === "client";
  const isArtist = userInfo.userType === "artist";

  useEffect(() => {
    const req_participant = async () => {
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
      req_participant();
    }
    const req_museum = async () => {
      try {
        setIsLoading(true);
        const res = await getMuseum(museumId).unwrap();
        console.log(res);
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
    const req_artworks = async () => {
      try {
        setIsLoading(true);
        const res = await getArtworks(museumId).unwrap();
        console.log(res);
        setArtworks(res.artworks);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      }
    };

    if (isParticipation) {
      req_museum();
      req_artworks();
    }
  }, [isParticipation]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const ajoutArtworkHandler = (newArtwork) => {
    setArtworks((prevArtworks) => [newArtwork, ...prevArtworks]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // <LoadingArtifex />
  return isLoading ? (
    <>
      <div className="Collection-container">
        <div className="ShowcaseMusartist-container">
          <img
            src={museum?.museumImage}
            alt=""
            className={`MuseumShowCaseImageBanner ${
              isLoading ? "skeleton_img_museum_showcase" : ""
            }`}
            style={{ height: "200px" }}
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
        <div className="art-skeleton-container">
          {Array.from({ length: artworksPerPage }, (_, index) => (
            <ArtworkSkeleton key={index} />
          ))}
        </div>
        <Artworktoadd />
      </div>
    </>
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
        {!isOpen ? (
          <ArtsList items={artworks} isShowCase={true} onOpen={toggleModal} />
        ) : (
          <>{museum?.isExclusive ? (
            <>
              <div className="addArtworkToShowCase">
                <NewArtworkArtist
                  onClose={toggleModal}
                  onAjout={ajoutArtworkHandler}
                />
              </div>{" "}
            </>):( <><p>Add non-exclusive</p><button onClick={toggleModal}>close</button></>)}
          </>
        )}
        <Pagination
          artworksPerPage={artworksPerPage}
          totalArtworks={artworks.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

const Pagination = ({
  artworksPerPage,
  totalArtworks,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalArtworks / artworksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className={`page-link ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Showcase;
