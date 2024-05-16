import React, { useEffect, useState } from "react";
import heart from "../../../assets/images/heart.png";
import eye from "../../../assets/images/eye.png";
import DeleteIcon from "../../../assets/images/delete.svg";
import "./ArtsItemCard.css";
import { useGetViewsMutation } from "../../../slices/reviewSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useRemoveArtworkFromPanierMutation } from "../../../slices/usersApiSlice";

const ArtsItem = (props) => {
  const checkBoxId = `checkboxInput-${props.id}`;
  const [getViews, { isLoading }] = useGetViewsMutation();
  const [views, setViews] = useState(props.Views);
  useEffect(() => {
    if (props.passKey) {
      const req = async () => {
        try {
          const res = await getViews(props.id);
          // console.log(res.data.views);
          setViews(res.data.views);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
      req();
    }
  }, []);

  const [removeFromCard] = useRemoveArtworkFromPanierMutation();
  const deleteArtworkHandler = async () => {
    const toastId = toast.loading("removing from card ...");
    try {
      await removeFromCard({
        artworkId: props.id,
      }).unwrap();
      // props.deleteItemById(props.id);
      toast.update(toastId, {
        render: `${props.title} has been removed Successfully to your Card!`,
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

  const updateImageUrl = (imageUrl) => {
    const oldBaseUrl = "http://res.cloudinary.com/duvougrqx/image/upload/";
    const newBaseUrl = "http://res.cloudinary.com/duvougrqx/image/upload/l_logo_artifex,e_colorize,co_white,o_50/";
    
    console.log("here the image ",imageUrl);
    console.log(imageUrl.startsWith(oldBaseUrl));
    if (imageUrl.startsWith(oldBaseUrl)) {
      return imageUrl.replace(oldBaseUrl, newBaseUrl);
    } else {
      return imageUrl; // Return the original URL if it doesn't start with the old base URL
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="cardd" key={props.id}>
          <Link to={`/artwork/${props.id}`} style={{ cursor: "pointer" }}>
            <img src={updateImageUrl(props.Image)} alt="" className="card-image" />
          </Link>
          <div className="card-body">
            <Link
              to={`/artwork/${props.id}`}
              style={{ cursor: "pointer" }}
              className="text-decoration-link"
            >
              <h5 className="card-title">{props.title}</h5>
            </Link>
            <p className="card-text">{props.price} DT</p>
            {!props.collection && (
              <>
                <button className="CartBtn">
                  <span className="IconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                      fill="rgb(17, 17, 17)"
                      className="cart"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                    </svg>
                  </span>
                  <p className="text">Add to Cart</p>
                </button>
              </>
            )}
            {props.collection && (
              <button
                className="btn-delete-artwork-from-card"
                onClick={deleteArtworkHandler}
              >
                <img src={DeleteIcon} alt="" className="icon" />
              </button>
            )}
            <div className="card-footer">
              <span className="author">{props.Artist}</span>
              <div style={{ width: "15px", height: "15px" }}>
                <input
                  type="checkbox"
                  id={checkBoxId}
                  //   id="checkboxInput"
                  className="checkbox-input"
                />
                <label htmlFor={checkBoxId} className="bookmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                    className="svgIcon"
                  >
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                  </svg>
                </label>
              </div>
              <p> </p>
              <img
                src={heart}
                style={{ width: "15px", height: "15px" }}
                alt="heart"
              />
              <span className="likes">{props.Likes} Likes </span>
              <img
                src={eye}
                style={{ width: "15px", height: "15px" }}
                alt="eye"
              />
              <span className="views">{views}K</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtsItem;
