import React, { useEffect, useState } from "react";
import { useGetArtworksForAdminMutation } from "../../../../slices/artworksSlice";
import ArtworkSkeleton from "../../../../home/Components/ArtworkSkeleton"; // Ensure the correct path
import { toast } from "react-toastify";
import ArtsAdminList from "./ArtsAdminList";

const ManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage] = useState(12);
  const [getArtworks] = useGetArtworksForAdminMutation();

  useEffect(() => {
    const clearSessionStorage = () => {
      sessionStorage.removeItem("artworksCache");
    };
    window.addEventListener("beforeunload", clearSessionStorage);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchArtworks = async () => {
      const cacheKey = "artworksCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();
      const oneDay = 1 * 60 * 1000;

      if (cache && now - cache.timestamp < oneDay) {
        console.log("cache artworks");
        setArtworks(cache.data);
        setIsLoading(false);
      } else {
        try {
          console.log("request artworks");
          const responseData = await getArtworks().unwrap();
          setArtworks(responseData.artworks);
          console.log(responseData.artworks);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ data: responseData.artworks, timestamp: now })
          );
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          setIsLoading(false);
        }
      }
    };
    fetchArtworks();
  }, [getArtworks]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentArtworks = artworks.slice(
    (currentPage - 1) * artworksPerPage,
    currentPage * artworksPerPage
  );

  const deleteItemById = (id) => {
    console.log("ID to delete:", id);
    const updatedCollection = artworks.filter((item) => {
      console.log("Item ID:", item._id);
      return item._id !== id;
    });
    setArtworks(updatedCollection);
  };

  return (
    <div>
      {isLoading ? (
        <div className="Collection-container">
          <div className="art-skeleton-container">
            {Array.from({ length: artworksPerPage }, (_, index) => (
              <ArtworkSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : artworks.length !== 0 ? (
        <div className="Collection-container">
          <ArtsAdminList
            items={currentArtworks}
            deleteItemById={deleteItemById}
          />
          <Pagination
            artworksPerPage={artworksPerPage}
            totalArtworks={artworks.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <p>no artworks</p>
      )}
    </div>
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

export default ManageArtworks;
