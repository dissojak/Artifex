import React, { useEffect, useState } from "react";
import "./ArtistProfileForUser.css";
import ProfileSection from "../Components/ProfileSection.jsx";
import { useParams } from "react-router-dom";
import { useGetUserMutation } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";

const ArtistProfileForUser = () => {
  const { username } = useParams();

  const [user,setUser]=useState();
  const [getUser,{isLoading}]=useGetUserMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const res = await getUser(username);
        console.log(res.data.user);
        setUser(res.data.user);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);
  return (
    <>
      {isLoading && (
        <div className="center_spinner">
          {/* <LoadingSpinner /> */}
          <img src="./elements/11a.gif" alt="" />
        </div>
      )}
      <div className="ArtistProfileForUser-container">
      {!isLoading && user && <ProfileSection user={user}/>}
      </div>
    </>
  );
};

export default ArtistProfileForUser;
