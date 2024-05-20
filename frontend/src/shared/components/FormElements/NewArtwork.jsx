import React, { useEffect, useState } from "react";
import "./NewArtwork.css";
import { useHttp } from "../../hooks/http-hook";
import ErrorModal from "../UIElements/ErrorModal";
import UploadWidget from "./UploadWidget";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddArtworkSignupMutation } from "../../../slices/artworksSlice";

const NewArtworkArtist = (props) => {
  const [categories, setCategories] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [formErrors, setFormErrors] = useState({});

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

  const validateForm = () => {
    const errors = {};
    if (formData.title.length < 2 || formData.title.length > 25) {
      errors.title = "Title must be between 2 and 25 characters long";
    }
    if (formData.description.length < 10 || formData.description.length > 400) {
      errors.description = "Description must be between 10 and 400 characters long";
    }
    if (isNaN(formData.price) || formData.price === "") {
      errors.price = "Price must be a number";
    }
    if (!formData.category) {
      errors.category = "Category must be selected";
    }
    if (!img) {
      errors.imageArtwork = "Image must be uploaded";
    }
    return errors;
  };

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
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const toastId = toast.loading("Saving Your Artwork...");
    try {
      const req = await addArtwork({
        _id: userInfo._id,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        imageArtwork: img,
        id_category: formData.category,
      }).unwrap();
      toast.update(toastId, {
        render: "Your New Artwork has been saved Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      props.onClose();
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
      {!isLoading && categories.length > 0 && (
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
              {formErrors.title && <p className="error-text">{formErrors.title}</p>}
              <p style={{ color: "black" }}>Price</p>
              <input
                type="text"
                className="newArtworkInputs"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
              />
              {formErrors.price && <p className="error-text">{formErrors.price}</p>}
              <p style={{ color: "black" }}>Category</p>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formErrors.category && <p className="error-text">{formErrors.category}</p>}
              <p style={{ color: "black" }}>Description</p>
              <textarea
                name="description"
                placeholder="Describe the artwork"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {formErrors.description && <p className="error-text">{formErrors.description}</p>}
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
              {formErrors.imageArtwork && <p className="error-text">{formErrors.imageArtwork}</p>}
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
