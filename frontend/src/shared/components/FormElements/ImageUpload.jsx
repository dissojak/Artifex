import React, { useState, useEffect, useContext } from "react";
// import axios from 'axios';
import "./ImageUpload.css";
import "./ProfileImage.css";
import { useHttp } from "../../hooks/http-hook";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import "../../../UserProfile/Pages/Profile.css";
import DefaultImg from "../../../assets/images/default_profile_img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileImageMutation } from "../../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../../slices/authSlice";
import "../Nav/DropDownProfilePic.css";

const ImageUpload = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [url, setUrl] = useState(userInfo.image ? userInfo.image : null);
  const [isUploading, setIsUploading] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttp();
  const dispatch = useDispatch();

  const [updateImage] = useUpdateProfileImageMutation();

  const handlePictureUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ufkishd8");
  
    try {
      setIsUploading(true);
  
      const response = await fetch("https://api.cloudinary.com/v1_1/duvougrqx/image/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }
  
      const data = await response.json();
      const imageUrl = data.secure_url;
  
      try {
        const res = await updateImage({
          _id: userInfo._id,
          imageUrl,
        }).unwrap();
  
        let updateUserInfo = { ...userInfo };
        if (updateUserInfo.image) {
          updateUserInfo.image = imageUrl;
        } else {
          updateUserInfo = {
            ...updateUserInfo,
            image: imageUrl,
          };
        }
  
        dispatch(setCredentials(updateUserInfo));
        toast.success("Image updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  
      setUrl(imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setIsUploading(false);
    }
  };
  

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <label className="button_member">
        <input
          id="profilePictureInput"
          type="file"
          onChange={handlePictureUpload}
          accept="image/*"
          style={{ display: "none" }}
        />
        {isLoading && <LoadingSpinner asOverlay />}
        {isUploading && <div className="loader">Uploading...</div>}
        <img className="profile-image" src={url || DefaultImg} alt="" />
        <img className="hover_img" src="elements/Change_pdf.png" alt="" />
      </label>
    </>
  );
};

export default ImageUpload;
