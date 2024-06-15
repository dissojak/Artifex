import React, { useEffect, useState } from "react";
import { useGetPanierMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex";
import "../../Collection/Pages/Collection.css";
import CardList from "../Components/CardList";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton";

const Card = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [getPanier] = useGetPanierMutation();

  useEffect(() => {
    const fetchPanier = async () => {
      setIsLoading(true);
      const cacheKey = "panierCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (cache && now - cache.timestamp < oneDay) {
        console.log("cache panier");
        setArtworks(cache.data);
        setIsLoading(false);
      } else {
        try {
          console.log("request panier");
          const res = await getPanier();
          setArtworks(res.data.artworks);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ data: res.data.artworks, timestamp: now })
          );
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          setIsLoading(false);
        }
      }
    };
    fetchPanier();
  }, [getPanier]);

  const deleteItemById = (id) => {
    console.log("ID to delete:", id);
    const updatedCollection = artworks.filter((item) => {
      console.log("Item ID:", item._id);
      return item._id !== id;
    });
    sessionStorage.removeItem("panierCache");
    setArtworks(updatedCollection);
  };

  return isLoading ? (
    // <LoadingArtifex />
    <div className="Collection-container">
      <div className="art-skeleton-container">
        {Array.from({ length: 8 }, (_, index) => (
          <ArtworkSkeleton key={index} />
        ))}
      </div>
    </div>
  ) : (
    <>
      {artworks.length === 0 ? (
        <div style={{ marginTop: "-265px" }}>
          <h1 className="no-artworks">
            The Card is Empty
            <br />
            You Can Add a New Artwork !
          </h1>
        </div>
      ) : (
        <div className="Collection-container">
          {!isLoading && artworks && (
            <CardList collection={artworks} deleteItemById={deleteItemById} />
          )}
        </div>
      )}
    </>
  );
};

export default Card;
