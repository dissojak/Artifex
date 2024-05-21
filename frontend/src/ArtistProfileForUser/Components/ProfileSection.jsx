import React, { useEffect, useState } from "react";
import "./ProfileSection.css";
import OrderSection from "./OrderSection.jsx";
import ArtworksSection from "./ArtworksSection.jsx";
import DefaultImg from "../../assets/images/default_profile_img.jpg";
import Logo from "../../assets/images/logo.svg";
import ArtsList from "../../home/Components/ArtsList.jsx";
import {
  useFollowArtistMutation,
  useGetFollowersMutation,
  useUnFollowArtistMutation,
} from "../../slices/followSlice.js";
import { toast } from "react-toastify";
import { useHttp } from "../../shared/hooks/http-hook.js";
import { useCountArtworksByArtistMutation } from "../../slices/artistsSlice.js";

const ProfileSection = (props) => {
  const userDataHere = props.artist;
  const [activeTab, setActiveTab] = useState("artworks"); // Default to artworks tab
  const [isFollowing, setIsFollowing] = useState(props.isFollowing); // Default to isFollowing

  const [categories, setCategories] = useState();
  const { sendRequest } = useHttp();
  const [followers, setFollowers] = useState(0);
  const [count, setCount] = useState(0);
  const [countArtworks] = useCountArtworksByArtistMutation();
  const [getFollowers] = useGetFollowersMutation();
  const [followArtist] = useFollowArtistMutation();
  const [UnfollowArtist] = useUnFollowArtistMutation();

  const follow = async () => {
    setIsFollowing(true);
    setFollowers(followers + 1);
    try {
      await followArtist({
        artistId: userDataHere._id,
      }).unwrap();
      // console.log(followers);
    } catch (err) {
      setFollowers(followers - 1);
      setIsFollowing(false);
      toast.error(err?.data?.message || err.error);
    }
  };

  const unfollow = async () => {
    setIsFollowing(false);
    setFollowers(followers - 1);
    try {
      await UnfollowArtist({
        artistId: userDataHere._id,
      }).unwrap();
      // console.log(followers);
    } catch (err) {
      setFollowers(followers + 1);
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

  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/category/getCategories"
        );
        setCategories(responseData.category);
      } catch (e) {}
      try {
        const res = await getFollowers(userDataHere._id).unwrap();
        // console.log("this : ", res);
        setFollowers(length(res.followers));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      try {
        const res = await countArtworks(userDataHere._id).unwrap();
        // console.log("this : ",res.count);
        setCount(res.count);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, [sendRequest]);

  return (
    <>
      <div id="ArtistProfileUser-section">
        <div className="profile-Banner"></div>
        <div className="profile-container7">
          <img
            className="profile-image7"
            src={userDataHere.profileImage || DefaultImg}
            alt="Artist Image"
          />
          <h1 className="profile-name7">{userDataHere.username}</h1>
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
          <p className="profile-details7">
            {followers && <>{followers}</>} Follower • {count && <>{count}</>}{" "}
            Artwork
          </p>
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
        {activeTab === "orders" && categories && (
          <OrderSection
            image={userDataHere.profileImage}
            categories={categories}
            id={userDataHere._id}
            orderStatus={userDataHere.orderStatus}
          />
        )}
        {props.artworks.length > 0 ? (
          <>{activeTab === "artworks" && <ArtsList items={props.artworks} />}</>
        ) : (
          <>
            {activeTab === "artworks" && (
              <h1 className="no-artworks">
                Yet, there is no artworks for this artist !
              </h1>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfileSection;
