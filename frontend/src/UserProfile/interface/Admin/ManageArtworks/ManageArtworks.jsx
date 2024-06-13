import React, { useEffect, useState } from "react";
import { useGetArtworksForAdminMutation } from "../../../../slices/artworksSlice";
import ArtworkSkeleton from "../../../../home/Components/ArtworkSkeleton"; // Ensure the correct path
import { toast } from "react-toastify";
import ArtsAdminList from "./ArtsAdminList";

const ManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage] = useState(12);
  const [getArtworks, { isLoading }] = useGetArtworksForAdminMutation();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const responseData = await getArtworks().unwrap();
        setArtworks(responseData.artworks);
        console.log(responseData.artworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
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
      ) : (
        <>
          <div className="Collection-container">
            <ArtsAdminList items={currentArtworks} deleteItemById={deleteItemById} />
            <Pagination
              artworksPerPage={artworksPerPage}
              totalArtworks={artworks.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </>
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
