import React, { useEffect, useState } from "react";
import './UserProfile.css';
import Profile from './Profile.jsx';
import { useGetUserMutation } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isArtist = userInfo.userType === "artist";
  const [user, setUser] = useState();
  const [getUser,{isLoading}]=useGetUserMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const res = await getUser(userInfo.username);
        setUser(res.data.user);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    if (userInfo.username&&isArtist) {
      req();
    }
  }, []);
  return (
    <div className="UserProfile-container">
   
     <Profile isLoading={isLoading} user={user}/>
      
    </div>
  );
};

export default UserProfile;
