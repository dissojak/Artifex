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
import { useGetArtworksOfArtistMutation } from "../../slices/artworksSlice";
import ArtistArtworks from "../../UserProfile/Components/ArtistArtworks";
import ArtistArtworksList from "../../UserProfile/Components/ArtistArtworksList";
import MuseumArtistArtworksList from "./MuseumArtistArtworksList";
import DoneLoader from "../../assets/images/doneLoader.gif";

const Showcase = () => {
  const { museumId } = useParams();
  const navigate = useNavigate();
  const [museum, setMuseum] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [MuseumsArtworks, setMuseumsArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [getMuseum] = useGetMuseumByIdMutation();
  const [inDateRange, setInDateRange] = useState(null);
  const [isParticipation, setIsParticipation] = useState(null);
  const [checkIsParticipant] = useIsParticipantMutation();
  const [getArtworks] = useGetArtworksOfMuseumMutation();
  const [getMuseumsArtworks] = useGetArtworksOfArtistMutation();
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
    const fetchArtworks = async () => {
      const cacheKey = "MuseumArtistArtworksCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();

      if (cache && now - cache.timestamp < 900000) {
        console.log("cache museum artworks");
        const reversedArtworks = cache.data.slice().reverse();
        console.log("museum artworks", reversedArtworks);
        setMuseumsArtworks(reversedArtworks);
      } else {
        try {
          const response = await getMuseumsArtworks({
            artistId: userInfo._id,
            inMuseum: true,
          }).unwrap();
          console.log("request museum artworks");
          // Reverse the order of the artworks array
          if (response.artworks.length !== 0) {
            const reversedArtworks = response.artworks.slice().reverse();
            // Reverse the order of the artworks array
            console.log("request museum artworks", reversedArtworks);
            setMuseumsArtworks(reversedArtworks);
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ data: response.artworks, timestamp: now })
            );
          } else {
            setMuseumsArtworks([]);
          }
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
    if (isParticipation) {
      if (isArtist) {
        fetchArtworks();
      }
      req_museum();
      req_artworks();
    }
  }, [isParticipation]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    console.log(!isOpen, museum?.isExclusive);
    setIsOpen(!isOpen);
  };

  const ajoutArtworkHandler = (newArtwork) => {
    setArtworks((prevArtworks) => [newArtwork, ...prevArtworks]);
  };

  const handleArtworksAdded = (addedArtworks) => {
    setArtworks((prevArtworks) => [...addedArtworks, ...prevArtworks]);
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
        {isArtist && <Artworktoadd />}
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
        {/* <img src={DoneLoader} alt="" /> */}
        <ArtsList items={artworks} isShowCase={isArtist} onOpen={toggleModal} />
        {isArtist && (
          <>
            {" "}
            {isOpen && (
              <>
                {!museum?.isExclusive ? (
                  <>
                    <div className="popupOverlay" onClick={toggleModal}>
                      <div className="addArtworkToShowCase">
                      <div
                        className="popupMuseumShowAddArtworkContainer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="addartworkcontainershowcase">
                        <NewArtworkArtist
                          onClose={toggleModal}
                          onAjout={ajoutArtworkHandler}
                        /></div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="popupOverlay" onClick={toggleModal}>
                      <div
                        className="popupMuseumShowArtworksContainer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {MuseumsArtworks && (
                          // <div className="gallery-container-museumsArtworksArtist">
                          <MuseumArtistArtworksList
                            collection={MuseumsArtworks}
                            onUpdateArtworks={handleArtworksAdded}
                            onClose={toggleModal}
                            onOpen={() => {
                              navigate("/profile");
                            }}
                          />
                          // </div>
                        )}
                        {/* <p>Add non-exclusive</p>
                        <button onClick={toggleModal}>close</button> */}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
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
