import React, { useEffect, useState } from "react";
import "./ProfileSection.css";
import OrderSection from "./OrderSection.jsx";
import ArtworksSection from "./ArtworksSection.jsx";
import Adem from "../../assets/images/Adem.jpg";
import Logo from "../../assets/images/logo.svg";
import ArtsList from "../../home/Components/ArtsList.jsx";
import { useFollowArtistMutation, useUnFollowArtistMutation } from "../../slices/followSlice.js";
import { toast } from "react-toastify";

const ProfileSection = (props) => {
  const userData = props.user;
  const [activeTab, setActiveTab] = useState("artworks"); // Default to artworks tab
  const [isFollowing,setIsFollowing]=useState(props.isFollowing); // Default to isFollowing
  
  const [followArtist]=useFollowArtistMutation();
  const [UnfollowArtist]=useUnFollowArtistMutation();

  const follow = async () => {
    setIsFollowing(true);
    try {
      await followArtist({
        artistId: userData._id,
      }).unwrap();
    } catch (err) {
      setIsFollowing(false);
      toast.error(err?.data?.message || err.error);
    }
  };

  const unfollow = async () => {
    setIsFollowing(false);
    try {
      await UnfollowArtist({
        artistId: userData._id,
      }).unwrap();
    } catch (err) {
      setIsFollowing(true);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleFollowChange = () => {
    if (isFollowing) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <>
      <div id="ArtistProfileUser-section">
        <div className="profile-Banner"></div>
        <div className="profile-container7">
          <img
            className="profile-image7"
            src={userData.profileImage}
            alt="Artist Image"
          />
          <h1 className="profile-name7">{userData.username}</h1>
          <p
            className="profile-details7"
            style={{
              fontSize: "12px",
              color: "#9866FF",
              fontFamily: "Raleway-SemiBold",
            }}
          >
            <img src={Logo} alt="logo" /> Artist
          </p>
          <p className="profile-details7">245 Follower • 12 Artwork</p>
          <button className="Btn7" onClick={handleFollowChange}>
            {isFollowing ? (
              <p className="text7">Unfollow</p>
            ) : (
              <p className="text7">Follow</p>
            )}
            <span className="effect7"></span>
          </button>
        </div>
        <div className="Buttonart-order-section">
          <br />
          <div className="tab-container7">
            <input
              type="radio"
              name="tab"
              id="tab1"
              className="tab7 tab--17"
              checked={activeTab === "artworks"}
              onChange={() => setActiveTab("artworks")}
            />
            <label className="tab_label7" htmlFor="tab1">
              Artworks
            </label>

            <input
              type="radio"
              name="tab"
              id="tab2"
              className="tab7 tab--27"
              checked={activeTab === "orders"}
              onChange={() => setActiveTab("orders")}
            />
            <label className="tab_label7" htmlFor="tab2">
              Order
            </label>

            <div className="indicator7"></div>
          </div>
        </div>
        {/* Conditionally render sections based on activeTab */}
        {activeTab === "orders" && <OrderSection />}
        {props.artworks.length > 0 ? (
          <>{activeTab === "artworks" && <ArtsList items={props.artworks} />}</>
        ) : (
          <h1 className="no-artworks">
            Yet, there is no artworks for this artist !
          </h1>
        )}
      </div>
    </>
  );
};

export default ProfileSection;
