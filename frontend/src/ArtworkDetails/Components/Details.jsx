import React, { useEffect, useState } from "react";
import "./Details.css";
import { useSelector } from "react-redux";
import { useAddRatingMutation } from "../../slices/reviewSlice";
import { toast } from "react-toastify";
import {
  useArtworkPaymentMutation,
  useCheckVisibilityMutation,
  useDeleteArtworkMutation,
  useEditArtworkMutation,
  useMakePrivateMutation,
  useMakePublicMutation,
} from "../../slices/artworksSlice";
import Pay from "../../assets/images/pay.svg";
import { useAddArtworkToPanierMutation } from "../../slices/usersApiSlice";

const Details = (props) => {
  const { artwork: initialArtwork, reviews } = props;
  const [artwork, setArtwork] = useState(initialArtwork);

  const totalRatings = reviews.reviews.length;
  const averageRating =
    totalRatings > 0
      ? reviews.reviews.reduce((acc, review) => acc + review.rating, 0) /
        totalRatings
      : 0;
  const formattedAverage = averageRating.toFixed(1);

  const { userInfo } = useSelector((state) => state.auth);
  const isArtist = userInfo.userType === "artist";
  const isClient = userInfo.userType === "client";
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
      const review = reviews.reviews.find(
        (review) => review.clientId._id === userInfo._id
      );
      return review ? review.rating : 0;
    };
    findUserRating().then((rating) => {
      setUserRating(rating);
    });

    const req = async () => {
      if (isArtist) {
        try {
          const res = await checkIsPublic(artwork._id).unwrap();
          // console.log(res);
          setIsChecked(res.visibility);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
    req();

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
    const toastId = toast.loading("Add to your cart ...");
    try {
      await addToCard({
        artworkId: artwork._id,
      }).unwrap();
      toast.update(toastId, {
        render: `${artwork.title} has been added Successfully to your Cart!`,
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

  const [updateArtwork] = useEditArtworkMutation();

  // State for editable fields
  const [editableArtwork, setEditableArtwork] = useState({
    title: artwork.title,
    description: artwork.description,
    price: artwork.price,
  });

  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableArtwork({
      ...editableArtwork,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    const toastId = toast.loading("Saving changes...");
    try {
      const res = await updateArtwork({
        artworkId: artwork._id,
        ...editableArtwork,
      }).unwrap();
      toast.update(toastId, {
        render: "Changes have been saved successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setArtwork({ ...artwork, ...editableArtwork }); // Update artwork state directly
      setIsEditMode(false); // Exit edit mode after saving changes
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const [deleteArtwork] = useDeleteArtworkMutation();
  const [makePublic] = useMakePublicMutation();
  const [makePrivate] = useMakePrivateMutation();
  const [checkIsPublic] = useCheckVisibilityMutation();

  const handleMakePublic = async () => {
    const toastId = toast.loading("visibility changing...");
    setIsChecked(false);
    try {
      const res = await makePublic({
        artworkId: artwork._id,
      }).unwrap();
      toast.update(toastId, {
        render: "Artwork is Public now !",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      setIsChecked(true);
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleMakePrivate = async () => {
    const toastId = toast.loading("visibility changing...");
    setIsChecked(true);
    try {
      const res = await makePrivate({
        artworkId: artwork._id,
      }).unwrap();
      toast.update(toastId, {
        render: "Artwork is Private now !",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      setIsChecked(false);
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      handleMakePublic();
    } else {
      handleMakePrivate();
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="artwork-details">
      {isEditMode ? (
        <input
          type="text"
          name="title"
          className="text-input-edit CadreColor"
          value={editableArtwork.title}
          onChange={handleInputChange}
        />
      ) : (
        <div className="PositionalContainerPrivacy">
          <h1>{artwork.title}</h1>
          <div>
            <label className="container-privacy">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <svg
                className={`eye ${isChecked ? "hidden" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
              </svg>
              <svg
                className={`eye-slash ${isChecked ? "" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path>
              </svg>
              <span className="privacy-text">
                {isChecked ? "Make Public" : "Make Private"}
              </span>
            </label>
          </div>
        </div>
      )}
      {isEditMode ? (
        <input
          className="CadreColor"
          type="text"
          name="price"
          value={editableArtwork.price}
          onChange={handleInputChange}
        />
      ) : (
        <p className="price">{artwork.price} DT</p>
      )}
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
      {isEditMode ? (
        <textarea
          className="description-editor CadreColor"
          name="description"
          value={editableArtwork.description}
          onChange={handleInputChange}
        />
      ) : (
        <p className="description">{artwork.description}</p>
      )}
      <div className="ratingArtworkDetailsContainer">
        <p
          className="category"
          style={{ color: "#9866FF", fontWeight: "bold" }}
        >
          Category:{" "}
        </p>
        <p className="category">{artwork.id_category.name}</p>
      </div>
      {isClient && !artwork.Sold && (
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
      {isArtist && (
        <>
          <button onClick={toggleEditMode} className="edit-button">
            {isEditMode ? "Cancel" : "Edit"}
          </button>
          {isEditMode && (
            <button onClick={handleSaveChanges} className="save-button">
              Save Changes
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Details;
