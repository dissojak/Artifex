import React, { useEffect, useState } from "react";
import heart from "../../../assets/images/heart.png";
import eye from "../../../assets/images/eye.png";
import "./ArtsItemCard.css";
import { useGetViewsMutation } from "../../../slices/reviewSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ArtsItemCollection = (props) => {
  const checkBoxId = `checkboxInput-${props.id}`;
  const [getViews, { isLoading }] = useGetViewsMutation();
  const [views, setViews] = useState(props.Views);

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
  }, [props.id, props.passKey, getViews]);

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
          <div className="card-body">
            <Link
              to={`/artwork/${props.id}`}
              style={{ cursor: "pointer" }}
              className="text-decoration-link"
            >
              <h5 className="card-title">{props.title}</h5>
            </Link>
            <p className="card-text">{props.price} DT</p>
            <div className="card-footer">
              <span className="author">{props.Artist}</span>
              <div style={{ width: "15px", height: "15px" }}>
                <input
                  type="checkbox"
                  id={checkBoxId}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtsItemCollection;
