import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { useAddArtworkSignupMutation } from "../../slices/artworksSlice";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { toast } from "react-toastify";
import UploadWidget from "../../shared/components/FormElements/UploadWidget";
import Logo from "../../assets/images/Logo_Artifex.png";
import "./SocialMedia.css";

const SocialMedia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialMediaData, setSocialMediaData] = useState({
    phone_number: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const [register] = useRegisterMutation();
  const [addArtwork] = useAddArtworkSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnload = (event) => {
      localStorage.removeItem("userData");
      localStorage.removeItem("newArtworkData1");
      localStorage.removeItem("newArtworkData2");
      localStorage.removeItem("newArtworkData3");
      localStorage.removeItem("artworkImage3");
      localStorage.removeItem("artworkImage2");
      localStorage.removeItem("artworkImage1");
      event.returnValue = ""; // Chrome requires returnValue to be set
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const artwork1 = JSON.parse(localStorage.getItem("newArtworkData1"));
    const artwork2 = JSON.parse(localStorage.getItem("newArtworkData2"));
    const artwork3 = JSON.parse(localStorage.getItem("newArtworkData3"));
    const artworkImg3 = JSON.parse(localStorage.getItem("artworkImage3"));
    const artworkImg2 = JSON.parse(localStorage.getItem("artworkImage2"));
    const artworkImg1 = JSON.parse(localStorage.getItem("artworkImage1"));

    try {
      const res = await register({
        username: userData.username,
        email: userData.email,
        userType: userData.userType,
        pw: userData.pw,
        phone_number: socialMediaData.phone_number,
        instagram: socialMediaData.instagram,
        twitter: socialMediaData.twitter,
        linkedin: socialMediaData.linkedin,
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const rep1 = await addArtwork({
        _id: userInfo._id,
        title: artwork1.title,
        description: artwork1.description,
        price: artwork1.price,
        imageArtwork: artworkImg1,
        id_category: artwork1.category,
      }).unwrap();

      const rep2 = await addArtwork({
        _id: userInfo._id,
        title: artwork2.title,
        description: artwork2.description,
        price: artwork2.price,
        imageArtwork: artworkImg2,
        id_category: artwork2.category,
      }).unwrap();

      const rep3 = await addArtwork({
        _id: userInfo._id,
        title: artwork3.title,
        description: artwork3.description,
        price: artwork3.price,
        imageArtwork: artworkImg3,
        id_category: artwork3.category,
      }).unwrap();

      localStorage.removeItem("userData");
      localStorage.removeItem("newArtworkData1");
      localStorage.removeItem("newArtworkData2");
      localStorage.removeItem("newArtworkData3");
      localStorage.removeItem("artworkImage3");
      localStorage.removeItem("artworkImage2");
      localStorage.removeItem("artworkImage1");

      navigate("/home");
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.data?.message || err.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
        <div
          className="art-form-backgroundSocialMedia"
          style={{ backgroundImage: `url(${"/elements/background_shape_Auth.svg"})` }}
        >
          <Link to="/home">
            <img src={Logo} alt="Artifex Logo" className="logoNavArtsocialmedia" />
          </Link>
        </div>
        <div className="art-signin-form-containerSocialMedia">
          <div className="art-signin-headerSocialMedia">Add Social Media</div>
          <div className="art-signin-stepSocialMedia">
            <p style={{ color: "black", fontFamily: "Montserrat-bold" }}>WhatsApp *</p>
            <input
              className="newArtworkInputsSocialMedia"
              placeholder="87654321"
              name="phone_number"
              value={socialMediaData.phone_number}
              onChange={handleInputChange}
            />
            <p style={{ color: "black", fontFamily: "Montserrat-bold" }}>Instagram</p>
            <input
              className="newArtworkInputsSocialMedia"
              name="instagram"
              placeholder="Instagram username"
              value={socialMediaData.instagram}
              onChange={handleInputChange}
            />
            <p style={{ color: "black", fontFamily: "Montserrat-bold" }}>X | Twitter</p>
            <input
              className="newArtworkInputsSocialMedia"
              name="twitter"
              placeholder="Twitter username"
              value={socialMediaData.twitter}
              onChange={handleInputChange}
            />
            <p style={{ color: "black", fontFamily: "Montserrat-bold" }}>LinkedIn</p>
            <input
              className="newArtworkInputsSocialMedia"
              name="linkedin"
              placeholder="LinkedIn username"
              value={socialMediaData.linkedin}
              onChange={handleInputChange}
            />
            <div className="art-signin-button-containerSocialMedia">
              <button className="signupBtnSocialMedia" onClick={submitRegisterHandler}>
                Sign Me Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <UploadWidget />
    </>
  );
};

export default SocialMedia;
