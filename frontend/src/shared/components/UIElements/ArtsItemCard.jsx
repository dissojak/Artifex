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
    const newBaseUrl =
      "http://res.cloudinary.com/duvougrqx/image/upload/l_logo_artifex,e_colorize,co_white,o_50/";

    // console.log("here the image ",imageUrl);
    // console.log(imageUrl.startsWith(oldBaseUrl));
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
            <img
              src={updateImageUrl(props.Image)}
              alt=""
              className="card-image"
            />
          </Link>
          <div className="card-body-Artwork">
            <Link
              to={`/artwork/${props.id}`}
              style={{ cursor: "pointer" }}
              className="text-decoration-link"
            >
              <h5 className="card-title">{props.title}</h5>
            </Link>
            <p className="card-text">{props.price} DT</p>
            {!props.inCard && (
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
            {props.inCard && (
              <>
                <button class="payBtnArtworkCard">
                  Pay
                  <svg class="svgIconPay" viewBox="0 0 576 512">
                    <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                  </svg>
                </button>
                <button
                  className="btn-delete-artwork-from-card"
                  onClick={deleteArtworkHandler}
                >
                  <img src={DeleteIcon} alt="" className="icon" />
                </button>
              </>
            )}
            <div className="card-footer-artwork">
              <span className="author">{props.Artist}</span>
              <div
                style={{ width: "15px", height: "15px" }}
                className="SaveArtworkCheck"
              >
                <input
                  type="checkbox"
                  id={checkBoxId}
                  //   id="checkboxInput"
                  className="checkbox-input"
                  disabled={props.inCard}
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
              <div title="Like" class="heart-container">
                <input id="Give-It-An-Id" class="checkbox" type="checkbox" />
                <div class="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="svg-outline"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="svg-filled"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100"
                    width="100"
                    class="svg-celebrate"
                  >
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                  </svg>
                </div>
              </div>
              {/* <span className="likes">{props.Likes} Likes </span> */}
              <div>
                <img
                  src={eye}
                  style={{ width: "15px", height: "15px" }}
                  alt="eye"
                  className="vuesArtwork"
                />
                <span className="views">{views}K</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtsItem;
