import React from "react";
import "./PopupFollowers.css"; // Make sure your CSS is correctly linked
import defaultImg from "../../assets/images/default_profile_img.jpg";
import Unfollow from "../../assets/images/unfollow.svg";
import { useRemoveFollowerMutation } from "../../slices/followSlice";
import { toast } from "react-toastify";

const PopupFollowers = (props) => {
  const [removeFollower] = useRemoveFollowerMutation();
  const removeHandeler = async (id) => {
    const toastId = toast.loading("removing client...");
    try {
      await removeFollower(id);
      toast.update(toastId, {
        render: `Done !`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (e) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  return (
    <div className="modal-backdropflw">
      <div className="modal-contentflw">
        <div className="modal-headerflw">
          <p
            style={{
              fontSize: "24px",
              fontFamily: "Raleway-Bold",
              paddingLeft: "8.5vw",
            }}
          >
            Followers
          </p>
          <img
            src="elements/X.svg"
            alt="Close"
            className="close-iconflw"
            onClick={props.onClose}
          />
        </div>
        <div className="followers-listflw">
          {props.followers.map((Follower) => (
            <div key={Follower.clientId._id} className="follower-itemflw">
              <div className="follower-img-avatarflw">
                <img
                  src={Follower.clientId.profileImage || defaultImg}
                  alt="avatar"
                />
              </div>
              <div className="follower-infoflw">
                <span className="follower-nameflw">
                  {Follower.clientId.username}
                </span>
              </div>
              <span
                className="status-iconflw"
                onClick={() => removeHandeler(Follower.clientId._id)}
              >
                <img src={Unfollow} alt="Unfollow icon" style={{cursor:"pointer"}}/>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupFollowers;
