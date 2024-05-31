import React, { useEffect, useState } from "react";
import { useGetPanierMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex";
import "../../Collection/Pages/Collection.css";
import CardList from "../Components/CardList";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton";

const Card = () => {
  const [artworks, setArtworks] = useState();
  const [getPanier, { isLoading }] = useGetPanierMutation();

  useEffect(() => {
    const req = async () => {
      try {
        const res = await getPanier();
        // console.log(res.data);
        setArtworks(res.data.artworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  const deleteItemById = (id) => {
    console.log("ID to delete:", id);
    const updatedCollection = artworks.filter((item) => {
      console.log("Item ID:", item._id);
      return item._id !== id;
    });
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
      <div className="Collection-container">
        {!isLoading && artworks && (
          <CardList collection={artworks} deleteItemById={deleteItemById} />
        )}
      </div>
    </>
  );
};

export default Card;
