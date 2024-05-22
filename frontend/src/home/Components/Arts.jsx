import React, { Fragment, useEffect, useState } from "react";
import "./Arts.css";
import ArtsList from "./ArtsList";
import loading from "../../assets/images/loadpurple.gif";
import { toast } from "react-toastify";
import { useGetArtworksMutation } from "../../slices/artworksSlice";

const Arts = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]); // Suppose categories are dynamic
  const [getArtworks, { isLoading }] = useGetArtworksMutation();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const responseData = await getArtworks();
        setArtworks(responseData.data.artworks);
        setFilteredArtworks(responseData.data.artworks);
        setCategories([...new Set(responseData.data.artworks.map(art => art.id_category.name))]); 
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredArtworks(artworks);
    } else {
      const filtered = artworks.filter(art => art.id_category.name === selectedCategory);
      // console.log('Filtered artworks:', filtered);
      setFilteredArtworks(filtered);
    }
  }, [selectedCategory, artworks]);

  return (
    <Fragment>
      <br />
      <div id="HomeContainerClinet">
        <div className="auth-section2">
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>Art Showcase</h1>
          <p>Discover Exquisite Artworks from Talented Artists</p>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="custom-select"
          >
            <option value="all" style={{fontFamily:'Dubai'}}>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} style={{fontFamily:'Dubai'}}>{category}</option>
            ))}
          </select> 
        </div>
        {isLoading ? (
          <div className="center_spinner">
            <img src={loading} alt="Loading..." />
          </div>
        ) : (
          <ArtsList items={filteredArtworks} />
        )}
      </div>
    </Fragment>
  );
};

export default Arts;
