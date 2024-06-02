import React, { useEffect, useState } from "react";
import "./PinnedMuseums.css";
import { toast } from "react-toastify";
import PinnedMuseumsList from "./PinnedMuseumsList.jsx";
import { useGetPinnedMuseumsMutation } from "../../slices/museumsSlice.js";
import MuseumSkeleton from "../../MuseumPage/Components/Museums/Components/MuseumSkeleton.jsx";

const PinnedMuseums = () => {
  const [museums, setMuseums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [museumsPerPage] = useState(6);
  const [getPinnedMuseums, { isLoading }] = useGetPinnedMuseumsMutation();
  
  useEffect(() => {
    const fetchMuseums = async () => {
      try {
        const responseData = await getPinnedMuseums().unwrap();
        setMuseums(responseData.pinnedMuseums.map(item => item.museumId));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    fetchMuseums();
  }, []);

  const indexOfLastMuseum = currentPage * museumsPerPage;
  const indexOfFirstMuseum = indexOfLastMuseum - museumsPerPage;
  const currentMuseums = museums.slice(indexOfFirstMuseum, indexOfLastMuseum);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div className="PinnedMuseums-container">
        {isLoading ? (
          <div className="SkeletonMuseums-List PinnedMuseums-List-container">
          {Array.from({ length: 8 }, (_, index) => (
            <MuseumSkeleton key={index} />
          ))}
        </div>
        ) : (
          <>
            <PinnedMuseumsList items={currentMuseums} />
            <Pagination museumsPerPage={museumsPerPage} totalMuseums={museums.length} paginate={paginate} currentPage={currentPage} />
          </>
        )}
      </div>
    </>
  );
};

const Pagination = ({ museumsPerPage, totalMuseums, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalMuseums / museumsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination-containermuseum">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)}
             
               className={`page-link ${currentPage === number ? 'active' : ''}`}
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
