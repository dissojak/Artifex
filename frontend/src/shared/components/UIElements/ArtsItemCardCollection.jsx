import React, { useEffect, useState } from "react";
import heart from "../../../assets/images/heart.png";
import eye from "../../../assets/images/eye.png";
import "./ArtsItemCard.css";
import { useGetViewsMutation } from "../../../slices/reviewSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useIsLikedMutation } from "../../../slices/likeSaveSlice";

const ArtsItemCollection = (props) => {
  const checkBoxId = `checkboxInput-${props.id}`;
  const [getViews, { isLoading }] = useGetViewsMutation();
  const [views, setViews] = useState(props.Views);
  const { userInfo } = useSelector((state) => state.auth);
  const [checkIsLiked] = useIsLikedMutation();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (props.passKey) {
      const req = async () => {
        try {
          const res = await getViews(props.id);
          setViews(res.data.views);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
      req();
    }
    const req1 = async () => {
      try {
        const res = await checkIsLiked(props.id).unwrap();
        setIsLiked(res.isLiked);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req1();
  }, [props.id, props.passKey, getViews , checkIsLiked]);

  const handleDownload = async () => {
    try {
      const response = await fetch(props.Image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Artifex_${props.title}.png`; // Customize the file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="cardd" key={props.id}>
          <Link to={`/artwork/${props.id}`} style={{ cursor: "pointer" }}>
            <img src={props.Image} alt="" className="card-image" />
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
            <button className="download-btn" onClick={handleDownload}>
              <svg
                id="download"
                viewBox="0 0 24 24"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.29,17.29,13,18.59V13a1,1,0,0,0-2,0v5.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3a1,1,0,0,0-1.42-1.42ZM18.42,6.22A7,7,0,0,0,5.06,8.11,4,4,0,0,0,6,16a1,1,0,0,0,0-2,2,2,0,0,1,0-4A1,1,0,0,0,7,9a5,5,0,0,1,9.73-1.61,1,1,0,0,0,.78.67,3,3,0,0,1,.24,5.84,1,1,0,1,0,.5,1.94,5,5,0,0,0,.17-9.62Z"></path>
              </svg>
            </button>
            <div className="card-footer-artwork">
              <span className="author">{props.Artist}</span>
              {userInfo.userType === "client" && (
                <>
                  <div
                    style={{ width: "15px", height: "15px" }}
                    className="SaveArtworkCheck"
                  >
                    <input
                      type="checkbox"
                      id={checkBoxId}
                      className="checkbox-input"
                      disabled
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
                  <div title="Disabled" className="heart-container">
                    <input
                      id="Give-It-An-Id"
                      className="checkbox"
                      type="checkbox"
                      checked= {isLiked}
                      disabled
                    />
                    <div className="svg-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-outline"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-filled"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="100"
                        width="100"
                        className="svg-celebrate"
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
                </>
              )}
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

export default ArtsItemCollection;
