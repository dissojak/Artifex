import React, { useState } from "react";
import "./PopupFollowers.css"; // Make sure your CSS is correctly linked
import defaultImg from "../../assets/images/default_profile_img.jpg";
import Follow from "../../assets/images/follow.svg";
import Unfollow from "../../assets/images/unfollow.svg";
import {
  useFollowArtistMutation,
  useUnFollowArtistMutation,
} from "../../slices/followSlice";
import { toast } from "react-toastify";

const PopupFollowing = (props) => {
  const [followStatuses, setFollowStatuses] = useState(
    props.followers.reduce((acc, follower) => {
      acc[follower.artistId._id] = true;
      return acc;
    }, {})
  );

  const [followArtist] = useFollowArtistMutation();
  const [unfollowArtist] = useUnFollowArtistMutation();

  const follow = async (id) => {
    try {
      await followArtist({
        artistId: id,
      }).unwrap();
      setFollowStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: true,
      }));
      toast.success("Followed successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const unfollow = async (id) => {
    try {
      await unfollowArtist({
        artistId: id,
      }).unwrap();
      setFollowStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: false,
      }));
      toast.success("Unfollowed successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleFollowChange = (id) => {
    if (followStatuses[id]) {
      unfollow(id);
    } else {
      follow(id);
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
            Following
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
            <div key={Follower.artistId._id} className="follower-itemflw">
              <div className="follower-img-avatarflw">
                <img
                  src={Follower.artistId.profileImage || defaultImg}
                  alt="avatar"
                />
              </div>
              <div className="follower-infoflw">
                <span className="follower-nameflw">
                  {Follower.artistId.username}
                </span>
                <span className="follower-titleflw">Artist</span>
              </div>
              <span
                className="status-iconflw"
                onClick={() => handleFollowChange(Follower.artistId._id)}
              >
                {followStatuses[Follower.artistId._id] ? (
                  <img src={Unfollow} alt="Unfollow icon" />
                ) : (
                  <img src={Follow} alt="Follow icon" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupFollowing;
