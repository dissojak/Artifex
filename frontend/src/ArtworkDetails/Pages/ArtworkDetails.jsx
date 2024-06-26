import React, { useEffect, useState } from "react";
import "./ArtworkDetails.css";
import ArtSection from "../Components/ArtImgSection.jsx";
import CommentSection from "../Components/CommentSection.jsx";
import Details from "../Components/Details.jsx";
import { useParams } from "react-router-dom";
import { useGetArtworkMutation } from "../../slices/artworksSlice.js";
import { toast } from "react-toastify";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex.jsx";
import { useGetReviewsByArtworkIdMutation } from "../../slices/reviewSlice.js";
const ArtworkDetails = () => {
  const [isLoading, setIsLoading] = useState();
  const { artworkId } = useParams();

  const [getArtwork] = useGetArtworkMutation();
  const [artwork, setArtwork] = useState();
  const [getReviews] = useGetReviewsByArtworkIdMutation();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const req = async () => {
      try {
        setIsLoading(true);
        const res = await getArtwork(artworkId);
        // console.log(res.data.artwork);
        setArtwork(res.data.artwork);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
    const request = async () => {
      try {
        setIsLoading(true);
        const res = await getReviews(artworkId);
        // console.log("res : ",res);
        console.log(res.data);
        setReviews(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      }
    };
    request();
  }, []);

  const deleteCommentById = (clientId) => {
    const updatedReviews = reviews.reviews.map((review) => {
      if (review.clientId._id === clientId) {
        return { ...review, comment: "" };
      }
      return review;
    });

    setReviews({ ...reviews, reviews: updatedReviews });
  };

  const addCommentById = (clientId, newComment) => {
    const updatedReviews = reviews.reviews.map((review) => {
      if (review.clientId._id === clientId) {
        return { ...review, comment: newComment };
      }
      return review;
    });

    setReviews({ ...reviews, reviews: updatedReviews });
  };

  const addReview = (newReview) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      reviews: [...prevReviews.reviews, newReview],
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <LoadingArtifex />
  ) : (
    <div className="ArtworkDetails-container">
      {!isLoading && artwork && <ArtSection artwork={artwork} onAddReview={addReview}/>}
      <div id="DetailsSectionContainer">
        {!isLoading && artwork && reviews && (
          <Details artwork={artwork} reviews={reviews} />
        )}
        {!isLoading && artwork && reviews && (
          <CommentSection
            artwork={artwork}
            reviews={reviews}
            onDelete={deleteCommentById}
            onAddition={addCommentById}
          />
        )}
      </div>
    </div>
  );
};

export default ArtworkDetails;
