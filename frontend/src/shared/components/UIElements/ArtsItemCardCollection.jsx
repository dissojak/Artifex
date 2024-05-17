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
          // console.log(res.data.views);
          setViews(res.data.views);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
      req();
    }
  }, []);

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

export default ArtsItemCollection;
