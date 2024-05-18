import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { useAddArtworkSignupMutation } from "../../slices/artworksSlice";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { toast } from "react-toastify";
import UploadWidget from "../../shared/components/FormElements/UploadWidget";
import Logo from "../../assets/images/Logo_Artifex.png";
import "./SocialMedia.css";
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

      console.log(rep1);
      console.log(rep2);
      console.log(rep3);

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
            style={{
              backgroundImage: `url(${"/elements/background_shape_Auth.svg"})`,
            }}
          >
               <Link to="/home">
          <img src={Logo} alt="Artifex Logo" className="logoNavArtsocialmedia" />
        </Link>
          </div>
         
          <div className="art-signin-form-containerSocialMedia">
            <div className="art-signin-headerSocialMedia">Add Social Media</div>

            
              <div className="art-signin-stepSocialMedia">
              
                <p style={{ color: "black",fontFamily:"Montserrat-bold" }}>WhatsApp</p>
                <input
                  className="newArtworkInputsSocialMedia"
                 
                  placeholder="https://wa.me/+216"
                  name="Number"
                  // value={JSON.parse(localStorage.getItem("newArtworkData1")).title||formData.title}
               
                />
                <p style={{ color: "black",fontFamily:"Montserrat-bold"  }}>Instagram</p>
                <input
                 
                  className="newArtworkInputsSocialMedia"
                  name="Instagram"
                  placeholder="https://www.instagram.com/"
               
                />
               <p style={{ color: "black",fontFamily:"Montserrat-bold"  }}>X | Twitter</p>
                <input
                 
                  className="newArtworkInputsSocialMedia"
                  name="Twitter"
                  placeholder="https://twitter.com/"
               
                />
                 <p style={{ color: "black",fontFamily:"Montserrat-bold" }}>Linkedin</p>
                <input
                
                  className="newArtworkInputsSocialMedia"
                  name="Linkedin"
                  placeholder="https://linkedin.com/"
               
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
