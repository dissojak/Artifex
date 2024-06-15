import React, { useState } from "react";
import "./Artworktoadd.css";
import UploadIcon from "../../assets/images/uploadimage.svg";

const Artworktoadd = () => {
  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <div className="Artworktoadd-container">
        <div className="uploadBtnWrapper"></div>
      </div>
      {/*the end */}
    </>
  );
};

export default Artworktoadd;
