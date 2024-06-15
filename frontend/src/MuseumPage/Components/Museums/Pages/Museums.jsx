import React, { useEffect, useState } from "react";
import "./Museums.css";
import MuseumList from "../Components/MuseumsList"; // Adjust import if necessary
import { useGetClientMuseumsMutation } from "../../../../slices/museumsSlice";
import { toast } from "react-toastify";
import MuseumSkeleton from "../Components/MuseumSkeleton";

const Museums = () => {
  const [museums, setMuseums] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [museumsPerPage] = useState(8);
  const [getMuseums] = useGetClientMuseumsMutation();

  useEffect(() => {
    // Clear session storage on refresh
    const clearSessionStorage = () => {
      sessionStorage.removeItem("museumsCache");
    };

    window.addEventListener("beforeunload", clearSessionStorage);

    // Cleanup event listener
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  useEffect(() => {
    const fetchMuseums = async () => {
      setIsLoading(true);
      const cacheKey = "museumsCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();
      const oneDay = 3 * 60 * 1000;

      if (cache && now - cache.timestamp < oneDay) {
        console.log("cache museums");
        setMuseums(cache.data);
        setIsLoading(false);
      } else {
        try {
          console.log("request museums");
          const responseData = await getMuseums();
          setMuseums(responseData.data.museums);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ data: responseData.data.museums, timestamp: now })
          );
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          setIsLoading(false);
        }
      }
    };
    fetchMuseums();
  }, [getMuseums]);

  // Get current museums
  const indexOfLastMuseum = currentPage * museumsPerPage;
  const indexOfFirstMuseum = indexOfLastMuseum - museumsPerPage;
  const currentMuseums = museums.slice(indexOfFirstMuseum, indexOfLastMuseum);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div id="museum-section">
        <div className="museum-section2">
          <p style={{ color: "#5BD6FF", fontWeight: "bold" }}>Discover</p>
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>
            Check Out Our Museums
          </h1>
          <p>Get to know the special pieces from our artists in Artifex.</p>
        </div>
        {isLoading ? (
          <div className="Museum-skeleton-container">
            {Array.from({ length: 8 }, (_, index) => (
              <MuseumSkeleton key={index} />
            ))}
          </div>
        ) : (
          <MuseumList items={currentMuseums} />
        )}
        <Pagination
          museumsPerPage={museumsPerPage}
          totalMuseums={museums.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

const Pagination = ({
  museumsPerPage,
  totalMuseums,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMuseums / museumsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#!"
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

export default Museums;
