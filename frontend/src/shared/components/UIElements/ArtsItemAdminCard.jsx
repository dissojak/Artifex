import React, { useEffect, useState } from "react";
import "./ArtsItemCard.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useApproveArtworkMutation, useDeclineArtworkMutation } from "../../../slices/artworksSlice";

const ArtsAdminItem = (props) => {
  const [isLoading, setIsLoading] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const [approve] = useApproveArtworkMutation();
  const [decline] = useDeclineArtworkMutation();


  const approveArtwork = async () => {
    const toastId = toast.loading("Approving Artwork ...");
    try {
      await approve({
        artworkId: props.id,
        authorisation: userInfo.userType==="admin" ? true : false,
      }).unwrap();
      props.onDelete(props.id);
      toast.update(toastId, {
        render: `${props.title} is approved Successfully !`,
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

  const declineArtwork = async () => {
    const toastId = toast.loading("Declining Artwork ...");
    try {
      await decline({
        artworkId: props.id,
        authorisation: userInfo.userType==="admin" ? true : false,
      }).unwrap();
      props.onDelete(props.id);
      toast.update(toastId, {
        render: `${props.title} is declined Successfully !`,
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

  const [description, setDescription] = useState(props.description);
  useEffect(() => {
    function truncateDescription() {
      if (props.description.length > 90) {
        let str = props.description.substring(0, 90);
        return setDescription(str + "...");
      }else return props.description;
    }
    truncateDescription();
  }, [props.Description]);

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
            <p style={{ height: "70px" }}>{description}</p>
            <div className="button-Admin-Artwork-wrapper">
              <button
                className="accept-admin artwork-button-admin"
                onClick={approveArtwork}
              >
                Accept
              </button>
              <button
                className="reject-admin artwork-button-admin"
                onClick={declineArtwork}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtsAdminItem;
