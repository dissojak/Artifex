import React, { useEffect, useState } from "react";
import "./SavedArtwork.css";
import Art from "../../assets/images/image_artwork.png";
import loading from "../../assets/images/loadpurple.gif";
import heart from "../../assets/images/heart.png";
import eye from "../../assets/images/eye.png";
import { useGetSavedArtworksMutation } from "../../slices/likeSaveSlice";
import { toast } from "react-toastify";
import ArtsList from "../../home/Components/ArtsList";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton";

const SavedArtwork = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage] = useState(6);
  const [getSavedArtworks] = useGetSavedArtworksMutation();

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      const cacheKey = "savedArtworksCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (cache && now - cache.timestamp < oneDay) {
        console.log("cache saved artworks");
        setArtworks(cache.data);
        setIsLoading(false);
      } else {
        try {
          console.log("request saved artworks");

          const responseData = await getSavedArtworks().unwrap();
          const populatedArtworks = responseData.savedArtworks.map(
            (item) => item.artworkId
          );
          setArtworks(populatedArtworks);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ data: populatedArtworks, timestamp: now })
          );
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          setIsLoading(false);
        }
      }
    };
    fetchArtworks();
  }, [getSavedArtworks]);
  // Get current artworks
  const indexOfLastArt = currentPage * artworksPerPage;
  const indexOfFirstArt = indexOfLastArt - artworksPerPage;
  const currentArtworks = artworks.slice(indexOfFirstArt, indexOfLastArt);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(artworks.length / artworksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="savedartwork-container">
      {isLoading ? (
        // <div className="center_spinner">
        //   <img src={loading} alt="Loading..." />
        // </div>
        <div className="gallery-container2">
          {Array.from({ length: artworksPerPage }, (_, index) => (
            <ArtworkSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <ArtsList items={currentArtworks} />
          <div className="pagination-container20">
            <ul className="pagination20">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item20">
                  <a
                    onClick={() => paginate(number)}
                    className={`page-link20 ${
                      currentPage === number ? "active" : ""
                    }`}
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedArtwork;
