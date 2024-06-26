import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import "./Artists.css";
import ListArtists from "../Components/ListArtists.jsx";
import { useGetArtistsMutation } from "../../slices/artistsSlice.js";
import { toast } from "react-toastify";
import ArtistSkeleton from "../Components/ArtistSkeleton.jsx";

const ArtistPage = () => {
  const [artists, setArtists] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [getArtists] = useGetArtistsMutation();

  useEffect(() => {
    const clearSessionStorage = () => {
      sessionStorage.removeItem("artistsCache");
    };
    window.addEventListener("beforeunload", clearSessionStorage);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      const cacheKey = "artistsCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (cache && now - cache.timestamp < oneDay) {
        // Check if cached data is fresh (within 24 hours)
        console.log("cache artists");
        setArtists(cache.data);
        setIsLoading(false);
      } else {
        try {
          console.log("request artists");
          const responseData = await getArtists();
          setArtists(responseData.data.artists);
          console.log(responseData.data.artists);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ data: responseData.data.artists, timestamp: now })
          );
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          setIsLoading(false);
        }
      }
    };
    fetchArtists();
  }, [getArtists]);

  // Helper function to render multiple skeleton loaders
  const renderSkeletons = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <ArtistSkeleton key={index} />
    ));
  };

  return (
    <div className="ArtistPage-container">
      <div id="Artists-section">
        <div className="Artists-section2">
          <p
            style={{
              color: "#FD006F",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Discover
          </p>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              marginBottom: "2rem",
            }}
          >
            Meet Our Artists
          </h1>
          <p>Get to know the passionate individuals behind Artifex.</p>
        </div>
        {isLoading ? (
          <div className="Artists-container">
            {/* Render multiple skeletons, adjust the number as needed */}
            {renderSkeletons(10)}
          </div>
        ) : (
          artists && <ListArtists items={artists} />
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
