import React, { useEffect, useState } from "react";
import "./NewArtwork.css"; // Ensure this path is correct for your CSS file
import { useHttp } from "../../hooks/http-hook";
import ErrorModal from "../UIElements/ErrorModal";
import { useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";

const NewArtwork = () => {
  const [categories, setCategories] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    height: "",
    width: "",
    year: "",
  });
  const [formData2, setFormData2] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    height: "",
    width: "",
    year: "",
  });
  const [formData3, setFormData3] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    height: "",
    width: "",
    year: "",
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

  useEffect(() => {
    const handleUnload = (event) => {
      // Clear localStorage
      localStorage.removeItem("userData");
      event.returnValue = ""; // Chrome requires returnValue to be set
    };
    // Add event listener for leaving/closing the page
    window.addEventListener("beforeunload", handleUnload);
    // Cleanup the event listener when component unmounts
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange2 = (event) => {
    setFormData2({
      ...formData2,
      [event.target.name]: event.target.value,
    });
  };
  const handleChange3 = (event) => {
    setFormData3({
      ...formData3,
      [event.target.name]: event.target.value,
    });
  };

  const saveData = () => {
    if (step === 1) {
      localStorage.setItem("newArtworkData1", JSON.stringify(formData));
    } else if (step === 2) {
      localStorage.setItem("newArtworkData2", JSON.stringify(formData2));
    } else {
      localStorage.setItem("newArtworkData3", JSON.stringify(formData3));
    }
  };

  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  const saveDataImg = (url) => {
    localStorage.setItem("artworkImage1", JSON.stringify(url));
    setImg1(url);
  };
  const saveDataImg2 = (url) => {
    localStorage.setItem("artworkImage2", JSON.stringify(url));
    setImg2(url);
  };
  const saveDataImg3 = (url) => {
    localStorage.setItem("artworkImage3", JSON.stringify(url));
    setImg3(url);
  };

  const nextStep = () => {
    saveData();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const sendDataHandler = () => {
    saveData();
    navigate("/socialMedia");
  };

  const handleImageChange = () => {};

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && categories && (
        <div>
          <div
            className="art-form-background"
            style={{
              backgroundImage: `url(${"/elements/background_shape_Auth.svg"})`,
            }}
          ></div>
          <div className="art-signin-form-container">
            <div className="art-signin-header">Add Artwork</div>

            {step === 1 && (
              <div className="art-signin-step">
                {/* Step 1: Artwork Details */}
                <p style={{ color: "black" }}>Title</p>
                <input
                  className="newArtworkInputs"
                  type="text"
                  placeholder="Artwork Title"
                  name="title"
                  // value={JSON.parse(localStorage.getItem("newArtworkData1")).title||formData.title}
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
                   <option value="" disabled>
                  Select a category
                </option>
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
                    {img1 === "" ? (
                      <>
                        <span className="image-uploader-icon">+</span>
                        <span className="image-uploader-text">Main Image</span>
                      </>
                    ) : (
                      <img
                        className="image-uploader"
                        // src="./Images/pdpWork.jpg"
                        src={img1}
                        alt="artwork"
                      />
                    )}
                  </div>
                </label>
                <div className="art-signin-button-container">
                  <button
                    className="art-signin-button art-signin-next"
                    onClick={nextStep}
                  >
                    Next 1/3
                    <img
                      src="elements/arrow_without--.svg"
                      className="arrowww"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="art-signin-step">
                {/* Step 2: Artwork Dimensions & Pricing */}
                <p style={{ color: "black" }}>Title</p>
                <input
                  type="text"
                  className="newArtworkInputs"
                  placeholder="Artwork Title"
                  name="title"
                  value={formData2.title}
                  onChange={handleChange2}
                />
                <p style={{ color: "black" }}>Price</p>
                <input
                  type="text"
                  className="newArtworkInputs"
                  name="price"
                  placeholder="Price"
                  value={formData2.price}
                  onChange={handleChange2}
                />
                <p style={{ color: "black" }}>Categorie</p>
                <select
                  name="category"
                  value={formData2.category}
                  onChange={handleChange2}
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
                <p style={{ color: "black" }}>Description</p>
                <textarea
                  name="description"
                  placeholder="Describe the artwork"
                  value={formData2.description}
                  onChange={handleChange2}
                ></textarea>
                <label className="image-uploader">
                  <UploadWidget onUploadSuccess={saveDataImg2} />
                  <div className="image-uploader-content">
                    {img2 === "" ? (
                      <>
                        <span className="image-uploader-icon">+</span>
                        <span className="image-uploader-text">Main Image</span>
                      </>
                    ) : (
                      <img
                        className="image-uploader"
                        // src="./Images/pdpWork.jpg"
                        src={img2}
                        alt=""
                      />
                    )}
                  </div>
                </label>
                <div className="art-signin-button-container">
                  <button
                    className="art-signin-button art-signin-prev"
                    onClick={prevStep}
                  >
                    <img
                      src="elements/reverse_arrow.svg"
                      className="arrow_inverse"
                      alt=""
                    />
                    Previous
                  </button>
                  <button
                    className="art-signin-button art-signin-next"
                    onClick={nextStep}
                  >
                    Next 2/3
                    <img
                      src="elements/arrow_without--.svg"
                      className="arrowww"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="art-signin-step">
                {/* Step 3: Create Your Account */}
                <p style={{ color: "black" }}>Title</p>
                <input
                  className="newArtworkInputs"
                  type="text"
                  placeholder="Artwork Title"
                  name="title"
                  value={formData3.title}
                  onChange={handleChange3}
                />
                <p style={{ color: "black" }}>Price</p>
                <input
                  type="text"
                  className="newArtworkInputs"
                  placeholder="Price"
                  name="price"
                  value={formData3.price}
                  onChange={handleChange3}
                />
                <p style={{ color: "black" }}>Categorie</p>
                <select
                  name="category"
                  value={formData3.category}
                  onChange={handleChange3}
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
                <p style={{ color: "black" }}>Description</p>
                <textarea
                  name="description"
                  placeholder="Describe the artwork"
                  value={formData3.description}
                  onChange={handleChange3}
                ></textarea>
                <label className="image-uploader">
                  <UploadWidget onUploadSuccess={saveDataImg3} />
                  <div className="image-uploader-content">
                    {img3 === "" ? (
                      <>
                        <span className="image-uploader-icon">+</span>
                        <span className="image-uploader-text">Main Image</span>
                      </>
                    ) : (
                      <img
                        className="image-uploader"
                        // src="./Images/pdpWork.jpg"
                        src={img3}
                        alt=""
                      />
                    )}
                  </div>
                </label>
                <div className="art-signin-button-container">
                  <button
                    className="art-signin-button art-signin-prev"
                    onClick={prevStep}
                  >
                    <img
                      src="elements/reverse_arrow.svg"
                      className="arrow_inverse"
                      alt=""
                    />
                    Previous
                  </button>
                  <button
                    className="art-signin-button art-signin-create"
                    onClick={sendDataHandler}
                  >
                    Create Your Account 3/3
                    <img
                      src="elements/arrow_without--.svg"
                      className="arrowww"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NewArtwork;
