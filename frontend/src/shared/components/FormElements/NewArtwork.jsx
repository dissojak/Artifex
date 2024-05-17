import React, { useEffect, useState } from "react";
import "./NewArtwork.css";
import { useHttp } from "../../hooks/http-hook";
import ErrorModal from "../UIElements/ErrorModal";
import UploadWidget from "./UploadWidget";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddArtworkSignupMutation } from "../../../slices/artworksSlice";

const NewArtworkArtist = (props) => {
  const [categories, setCategories] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/category/getCategories"
        );
        setCategories(responseData.category);
      } catch (e) {}
    };
    req();
  }, [sendRequest]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [addArtwork] = useAddArtworkSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [img, setImg] = useState("");
  const saveDataImg = (url) => {
    setImg(url);
  };

  const saveData = async () => {
    const toastId = toast.loading("Saving Your Artwork...");
    console.log(formData);
    console.log(img);
    try {
      const req = await addArtwork({
        _id: userInfo._id,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        imageArtwork: img,
        id_category: formData.category,
      }).unwrap();
      console.log(req);
      toast.update(toastId, {
        render: "Your New Artwork has been saved Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && categories && (
        <div>
          <div className="art-artist-form-container">
            <div className="art-signin-header">Add Artwork</div>
            <div style={{ cursor: "pointer" }}>
              <img
                src="elements/X.svg"
                alt="Close"
                className="close-iconflw_artwork"
                onClick={props.onClose}
              />
            </div>
            <div className="art-signin-step">
              <p style={{ color: "black" }}>Title</p>
              <input
                className="newArtworkInputs"
                type="text"
                placeholder="Artwork Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <p style={{ color: "black" }}>Price</p>
              <input
                type="text"
                className="newArtworkInputs"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
              <p style={{ color: "black" }}>Categorie</p>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p style={{ color: "black" }}>Description</p>
              <textarea
                name="description"
                placeholder="Describe the artwork"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <label className="image-uploader">
                <UploadWidget onUploadSuccess={saveDataImg} />
                <div className="image-uploader-content">
                  {img === "" ? (
                    <>
                      <span className="image-uploader-icon">+</span>
                      <span className="image-uploader-text">Main Image</span>
                    </>
                  ) : (
                    <img className="image-uploader" src={img} alt="" />
                  )}
                </div>
              </label>
              <div className="art-signin-button-container">
                <button
                  className="art-signin-button art-signin-next"
                  onClick={saveData}
                >
                  create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewArtworkArtist;
