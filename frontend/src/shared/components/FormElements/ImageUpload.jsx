import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ImageUpload.css";
import "./ProfileImage.css";
import { AuthContext } from "../../context/auth-context";
import { useHttp } from "../../hooks/http-hook";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import "../../../profile/Pages/Profile.css";

const ImageUpload = () => {
  const auth = useContext(AuthContext);
  // Creating a reference to the file input element

  // State variables to manage the selected file, image URL, and validity
  const [url, setUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    // Fetch the user's data, including the profile picture URL, when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:8000/api/user/getUserByUserId/${auth.userId}`
        );
        setUrl(response.user.profileImage);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [auth.userId, sendRequest]);

  const handlePictureUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "h6ecoenf");

    try {
      setIsUploading(true);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/wassimelfen/image/upload",
        // cloudinary.config(process.env.CLOUDINARY_URL),
        // "https://api.cloudinary.com/v1_1/duvougrqx/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      // Save the uploaded image URL in your database
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      // await axios.post(
      //   `http://localhost:8000/api/user/update-profile-image/${auth.userId}`,
      //   "POST",
      //   {
      //     imageUrl,
      //   },
      //   {
      //     "Content-Type": "application/json",
      //   }
      // );
      await sendRequest(
        `http://localhost:8000/api/user/update-profile-image/${auth.userId}`,
        "PATCH",
        JSON.stringify({
          imageUrl: imageUrl,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      // Update the profile picture in the component's state
      setUrl(imageUrl);
      auth.updateProfilePicture(imageUrl);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading profile picture:", error.response.data);
      setIsUploading(false);
    }
  };

  return (
    // <div className="form-control">
    //   {/* Hidden file input element */}
    //   <input
    //     id={props.id}
    //     ref={filePickerRef}
    //     style={{ display: "none" }}
    //     accept=".jpg,png,jpeg"
    //     type="file"
    //     onChange={pickedHandler}
    //   />

    //   {/* Container for the image upload UI */}
    //   <div className={`image-upload ${props.center && "center"}`}>
    //     {/* Preview of the selected image */}
    //     <div className="image-upload__preview">
    //       {url && <img src={url} alt="Preview" />} {/* Displaying the image if URL exists */}
    //       {!url && <p>Please pick an image.</p>} {/* Message if no image is selected */}
    //     </div>

    //     {/* Button to initiate image selection */}
    //     <Button type="button" onClick={pickImageHandler}>
    //       Pick Image
    //     </Button>
    //   </div>

    //   {/* Displaying an error message if input is invalid */}
    //   {!isValid && <p>{props.errorText}</p>}
    // </div>

    <>
      <ErrorModal error={error} onClear={clearError} />
      {/* <div className="user-profile">
        <div className="avatar_profile">
          {isLoading && <LoadingSpinner asOverlay />}
          {isUploading && <div className="loader">Uploading...</div>}
          <img
            src={url || process.env.PUBLIC_URL + "/Images/pdpWork.jpg"}
            alt=""
          />
          {uploadError && <p className="error">{uploadError}</p>}
          <label
            className="changeProfileImageBtn"
            htmlFor="profilePictureInput"
          >
            غير صورة الحساب
          </label>
          <input
            className="changeProfileImageBtn"
            id="profilePictureInput"
            type="file"
            onChange={handlePictureUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div> */}
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
        <img
          className="img_member"
          src={url || process.env.PUBLIC_URL + "/elements/default_pdp1.png"}
          alt=""
        />
        <img className="hover_img" src="elements/Change_pdf.png" alt="" />
      </label>

      {/* </div> */}
    </>
  );
};

export default ImageUpload;
