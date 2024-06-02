import React, { useEffect, useState } from "react";
import "./Museums.css";
import MuseumList from "../Components/MuseumsList"; // Adjust import if necessary
import { useGetClientMuseumsMutation } from "../../../../slices/museumsSlice";
import { toast } from "react-toastify";
import MuseumSkeleton from "../Components/MuseumSkeleton";

const Museums = () => {
  const [museums, setMuseums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [museumsPerPage] = useState(8);
  const [getMuseums, { isLoading }] = useGetClientMuseumsMutation();

  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const responseData = await getMuseums();
        setMuseums(responseData.data.museums);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    fetchMuseums();
  }, []);

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
