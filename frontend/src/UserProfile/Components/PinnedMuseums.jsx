import React, { useEffect, useState } from "react";
import "./PinnedMuseums.css";
import { toast } from "react-toastify";
import PinnedMuseumsList from "./PinnedMuseumsList.jsx";
import { useGetPinnedMuseumsMutation } from "../../slices/museumsSlice.js";
import MuseumSkeleton from "../../MuseumPage/Components/Museums/Components/MuseumSkeleton.jsx";

const PinnedMuseums = () => {
  const [museums, setMuseums] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [museumsPerPage] = useState(6);
  const [getPinnedMuseums] = useGetPinnedMuseumsMutation();

  useEffect(() => {
    const fetchMuseums = async () => {
      setIsLoading(true);
      const cacheKey = "pinnedMuseumsCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (cache && now - cache.timestamp < oneDay) {
        // Check if cached data is fresh (within 24 hours)
        console.log("cache pinned museums");
        setMuseums(cache.data);
        setIsLoading(false);
      } else {
        try {
          console.log("request pinned museums");
          const responseData = await getPinnedMuseums().unwrap();
          const populatedMuseums = responseData.pinnedMuseums.map(
            (item) => item.museumId
          );
          setMuseums(populatedMuseums);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ data: populatedMuseums, timestamp: now })
          );
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          setIsLoading(false);
        }
      }
    };
    fetchMuseums();
  }, [getPinnedMuseums]);

  const indexOfLastMuseum = currentPage * museumsPerPage;
  const indexOfFirstMuseum = indexOfLastMuseum - museumsPerPage;
  const currentMuseums = museums.slice(indexOfFirstMuseum, indexOfLastMuseum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="PinnedMuseums-container">
        {isLoading ? (
          <div className="SkeletonMuseums-List PinnedMuseums-List-container">
            {Array.from({ length: 8 }, (_, index) => (
              <MuseumSkeleton key={index} />
            ))}
          </div>
        ) : museums.length !== 0 ? (
          <>
            <PinnedMuseumsList items={currentMuseums} />
            <Pagination
              museumsPerPage={museumsPerPage}
              totalMuseums={museums.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ) : (
          <div className="noOrdersContainer">
            <h1 style={{position:"relative",left:'12vw'}}>No Pinned Musuems Yet <br/>Pin one</h1>
          </div>
        )}
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
      <div className="pagination-containermuseum">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                className={`page-link ${
                  currentPage === number ? "active" : ""
                }`}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default PinnedMuseums;
