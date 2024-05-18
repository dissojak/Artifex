import React, { useEffect, useState } from "react";
import "./Details.css";
import { useSelector } from "react-redux";
import { useAddRatingMutation } from "../../slices/reviewSlice";
import { toast } from "react-toastify";
import { useArtworkPaymentMutation } from "../../slices/artworksSlice";
import Pay from "../../assets/images/pay.svg";
import { useAddArtworkToPanierMutation } from "../../slices/usersApiSlice";

const Details = (props) => {
  const artwork = props.artwork;
  const reviews = props.reviews.reviews;
  // console.log(artwork);

  const totalRatings = reviews.length;
  const averageRating =
    totalRatings > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalRatings
      : 0;
  const formattedAverage = averageRating.toFixed(1);

  const { userInfo } = useSelector((state) => state.auth);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const findUserRating = async () => {
      if (!userInfo || !reviews) {
        console.error("Invalid inputs to findUserRating:", {
          userInfo,
          reviews,
        });
        return 0;
      }
      const review = reviews.find(
        (review) => review.clientId._id === userInfo._id
      );
      return review ? review.rating : 0;
    };
    findUserRating().then((rating) => {
      setUserRating(rating);
    });
  }, [reviews, userInfo]);

  const [updateRating] = useAddRatingMutation();
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
    const req = async () => {
      const toastId = toast.loading("Saving Your Rating...");
      try {
        const res = await updateRating({
          artistId: artwork.id_artist._id,
          artworkId: artwork._id,
          newRating,
        }).unwrap();
        toast.update(toastId, {
          render: "Your New Rating has been saved Successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } catch (err) {
        toast.update(toastId, {
          render: err?.data?.message || err.error,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    };
    req();
  };

  const [addToCard] = useAddArtworkToPanierMutation();
  const handleAddToCart = async () => {
    const toastId = toast.loading("Add to your card ...");
    try {
      await addToCard({
        artworkId: artwork._id,
      }).unwrap();
      toast.update(toastId, {
        render: `${artwork.title} has been added Successfully to your Card!`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const [payment] = useArtworkPaymentMutation();
  const handleBuyArtwork = async () => {
    try {
      const res = await payment({
        amount: artwork.price * 1000,
        artworkId: artwork._id,
      }).unwrap();
      localStorage.setItem("artworkId", artwork._id);
      const paymentLink = res.paymentInfo.result.link;
      window.location.href = paymentLink;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="artwork-details">
      <h1>{artwork.title}</h1>
      <p className="price">{artwork.price} DT</p>
      <div className="ratingArtworkDetailsContainer">
        <div className="ratings">
          <div className="special-rating-commentsection">
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  name="rating"
                  id={`special-star${star}`}
                  value={star}
                  // disabled={userInfo.userType === 'artist'}
                  checked={userRating === star}
                  onChange={() => handleRatingChange(star)}
                />
                <label htmlFor={`special-star${star}`}></label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <p className="ratings">
          ({formattedAverage} stars) - {totalRatings} ratings
        </p>
      </div>
      <p className="description">{artwork.description}</p>
      <div className="ratingArtworkDetailsContainer">
        <p
          className="category"
          style={{ color: "#9866FF", fontWeight: "bold" }}
        >
          Category:{" "}
        </p>
        <p className="category">{artwork.id_category.name}</p>
      </div>
      {userInfo.userType === "client" && !artwork.Sold &&(
        <div className="buttonsartsection">
          <div className="buttoncart" onClick={handleAddToCart}>
            <div className="button-wrappercart">
              <div className="textcart">Add To Cart</div>
              <span className="iconcart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-cart2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </span>
            </div>
          </div>
          <div
            className="buttoncmt"
            data-tooltip={`Price: ${artwork.price}DT`}
            onClick={handleBuyArtwork}
          >
            <div className="button-wrappercmt">
              <div className="textcmt">Buy Now</div>
              <span className="iconcmt">
                <img
                  src={Pay}
                  alt="pay"
                  style={{ height: "40px", marginBottom: "5px" }}
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
