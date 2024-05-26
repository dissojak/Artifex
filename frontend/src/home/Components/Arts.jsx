import React, { Fragment, useEffect, useState } from "react";
import "./Arts.css";
import ArtsList from "./ArtsList";
import loading from "../../assets/images/loadpurple.gif";
import { toast } from "react-toastify";
import { useGetArtworksMutation } from "../../slices/artworksSlice";

const Arts = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [getArtworks, { isLoading }] = useGetArtworksMutation();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const responseData = await getArtworks();
        setArtworks(responseData.data.artworks);
        setCategories([...new Set(responseData.data.artworks.map(art => art.id_category.name))]);
        filterArtworks(responseData.data.artworks, 'all');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    filterArtworks(artworks, selectedCategory);
  }, [selectedCategory, artworks]);

  const filterArtworks = (artworks, category) => {
    const filtered = category === 'all' ? artworks : artworks.filter(art => art.id_category.name === category);
    setFilteredArtworks(filtered);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <div id="HomeContainerClinet">
        <div className="auth-section2">
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>Art Showcase</h1>
          <p>Discover Exquisite Artworks from Talented Artists</p>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="custom-select"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <div className="center_spinner">
            <img src={loading} alt="Loading..." />
          </div>
        ) : (
          <>
            <ArtsList items={filteredArtworks.slice((currentPage - 1) * artworksPerPage, currentPage * artworksPerPage)} />
            <Pagination
              artworksPerPage={artworksPerPage}
              totalArtworks={filteredArtworks.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </Fragment>
  );
};

const Pagination = ({ artworksPerPage, totalArtworks, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalArtworks / artworksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
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
    </nav>
  );
};

export default Arts;
