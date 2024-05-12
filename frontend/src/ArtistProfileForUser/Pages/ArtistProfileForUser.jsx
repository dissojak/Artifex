import React, { useEffect, useState } from "react";
import "./ArtistProfileForUser.css";
import ProfileSection from "../Components/ProfileSection.jsx";
import { useParams } from "react-router-dom";
import { useGetUserMutation } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";
import { useGetArtworksOfArtistMutation } from "../../slices/artworksSlice.js";
import loading from "../../assets/images/loadpurple.gif";
import { useIsFollowingMutation } from "../../slices/followSlice.js";

const ArtistProfileForUser = () => {
  const { username } = useParams();

  const [user, setUser] = useState();
  const [getUser] = useGetUserMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const res = await getUser(username);
        setUser(res.data.user);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    if (username) {
      req();
    }
  }, []);

  const [artworks, setArtworks] = useState();
  const [getArtworks, { isLoading }] = useGetArtworksOfArtistMutation();

  useEffect(() => {
    const request = async () => {
      try {
        const response = await getArtworks({
          artistId: user._id,
        });
        setArtworks(response.data.artworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    request();
    const req = async () => {
      try {
        const response = await checkIsFollowing({
          artistId: user._id,
        });
        console.log("is follwing : ", response.data.isFollowing);
        setIsFollowing(response.data);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, [user]);

  const [isfollowing, setIsFollowing] = useState();
  const [checkIsFollowing] = useIsFollowingMutation();

  return (
    <>
      {isLoading && (
        <div
          className="center_spinner"
          style={{ position: "relative", top: "4rem" }}
        >
          {/* <SBLoader className="Overlay"/> */}
          {/* <LoadingSpinner /> */}
          {/* <img src="./elements/11a.gif" alt="" /> */}
          <img src={loading} alt="" />

          {/* <SkeletonLoader /> */}
        </div>
      )}
      <div className="ArtistProfileForUser-container">
        {!isLoading && artworks && user && isfollowing && (
          <ProfileSection
            user={user}
            artworks={artworks}
            isFollowing={isfollowing.isFollowing}
          />
        )}
      </div>
    </>
  );
};

export default ArtistProfileForUser;
