import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { useAddArtworkSignupMutation } from "../../slices/artworksSlice";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { toast } from "react-toastify";
import UploadWidget from "../../shared/components/FormElements/UploadWidget";

const SocialMedia = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [register] = useRegisterMutation();
  const [addArtwork] = useAddArtworkSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnload = (event) => {
      // Clear localStorage
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
      }).unwrap();
      dispatch(setCredentials({ ...res }));

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("user info : ", userInfo._id);

         const rep1=await addArtwork({
          _id: userInfo._id,
          title: artwork1.title,
          description: artwork1.description,
          price: artwork1.price,
          imageArtwork:artworkImg1,
          id_category: artwork1.category,
        }).unwrap();

        const rep2=await addArtwork({
          _id: userInfo._id,
          title: artwork2.title,
          description: artwork2.description,
          price: artwork2.price,
          imageArtwork:artworkImg2,
          id_category: artwork2.category,
        }).unwrap();

        const rep3=await addArtwork({
          _id: userInfo._id,
          title: artwork3.title,
          description: artwork3.description,
          price: artwork3.price,
          imageArtwork:artworkImg3,
          id_category: artwork3.category,
        }).unwrap();

        console.log(rep1);
        console.log(rep2);
        console.log(rep3);

        localStorage.removeItem("userData");
        localStorage.removeItem("newArtworkData1");
        localStorage.removeItem("newArtworkData2");
        localStorage.removeItem("newArtworkData3");
        
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
      <h1>social media</h1>
      <button className="signupBtn" onClick={submitRegisterHandler}>
        sign me up
      </button>
      <UploadWidget/>
    </>
  );
};

export default SocialMedia;
