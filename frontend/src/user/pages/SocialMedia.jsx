import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { useAddArtworkSignupMutation } from "../../slices/artworksSlice";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { toast } from "react-toastify";

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
          imageArtwork:
            "https://images.pexels.com/photos/1677275/pexels-photo-1677275.jpeg",
          id_category: artwork1.category,
        }).unwrap();

        const rep2=await addArtwork({
          _id: userInfo._id,
          title: artwork2.title,
          description: artwork2.description,
          price: artwork2.price,
          imageArtwork:
            "https://i.pinimg.com/564x/d1/53/9b/d1539bc17fcf7ca97103749d95c3c716.jpg",
          id_category: artwork2.category,
        }).unwrap();

        const rep3=await addArtwork({
          _id: userInfo._id,
          title: artwork3.title,
          description: artwork3.description,
          price: artwork3.price,
          imageArtwork:
            "https://i.pinimg.com/736x/12/95/9a/12959ae6966821fb4f9e31dd6ec2f210.jpg",
          id_category: artwork3.category,
        }).unwrap();

        console.log(rep1);
        console.log(rep2);
        console.log(rep3);

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
    </>
  );
};

export default SocialMedia;
